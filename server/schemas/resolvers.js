const { AuthenticationError } = require('apollo-server-express');
const { User, Ingredient, Recipe, Direction, Cookware, Comment, Upvote } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        //Ingredient queries
        ingredients: async () => {
            return Ingredient.find()
        },

        ingredient: async (parent, { ingredientName }) => {
            return Ingredient.findOne({ ingredientName })
        },

        //User queries
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('groceryList')
                    .populate('recipeKit')
                    .populate('savedRecipes');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        users: async () => {
            return User.find()
                .select('-__v -password')
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('groceryList')
                .populate('recipeKit');
        },

        //Recipe queries
        recipes: async () => {
            return Recipe.find();
        },

        recipe: async (parent, { _id }) => {
            return Recipe.findOne(_id)
                .populate('steps')
                .populate('ingredients')
                .populate('cookware')
                .populate('comments')
                .populate('upvotes');
        },

        userUpvotedRecipes: async (parent, args, context) => {
            const recipes = await Recipe.aggregate([
                {
                    $lookup: {
                        from: 'upvotes',
                        localField: 'Upvote',
                        foreignField: 'username',
                        as: 'upvote'
                    }
                },
                {
                    $addFields: {
                        child: {
                            $arrayElemAt: ['$upvote', 0]
                        }
                    }
                },
                {
                    $match: {
                        'upvote.active': true
                    }
                }
            ])

            return recipes;
        }
    },

    Mutation: {
        //User mutations

        //For creating a new User and token for that User.
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        //For allowing an existing User to login after their token has expired.
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        //Ingredient mutations

        //For creating a new Ingredient and then adding it to a User's groceryList array.
        addIngredient: async (parent, args, context) => {
            // context if user is adding ingredient to grocerylist
            if (context.user) {
                const ingredient = await Ingredient.create(args);
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { groceryList: ingredient._id } },
                    { new: true }
                );

                return ingredient;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //Comment mutations

        addComment: async (parent, args, context) => {
            if (context.user) {
                const { recipeId, ...editedArgs } = args;
                const comment = await Comment.create({ ...editedArgs, username: context.user.username });
                await Recipe.findByIdAndUpdate(
                    args.recipeId,
                    { $push: { comments: comment._id } },
                    { new: true }
                );

                return comment;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        deleteComment: async (parent, { _id, recipeId }, context) => {
            if (context.user) {
                const comment = await Comment.findOneAndDelete(_id);
                await Recipe.findByIdAndUpdate(
                    recipeId,
                    { $pull: { comments: _id } },
                    { new: true }
                );

                return comment;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //Upvote mutations

        upvoteRecipe: async (parent, args, context) => {
            if (context.user) {
                const { recipeId, ...editedArgs } = args;
                const recipe = await Recipe.findById(args.recipeId);

                await Promise.all(recipe.upvotes.map(async item => {
                    const upvote = await Upvote.findById(item);
                    const duplicate = (upvote.username === context.user.username) ? true : false;
                    if (duplicate) {
                        throw new AuthenticationError('User has already upvoted this recipe.');
                    }
                }));

                const upvote = await Upvote.create({ ...editedArgs, username: context.user.username });
                await Recipe.findByIdAndUpdate(
                    args.recipeId,
                    { $addToSet: { upvotes: upvote._id } },
                    { new: true }
                );

                return upvote;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        deleteUpvoteRecipe: async (parent, { _id, recipeId }, context) => {
            if (context.user) {
                const upvote = await Upvote.findOneAndDelete(_id);
                await Recipe.findByIdAndUpdate(
                    recipeId,
                    { $pull: { upvotes: _id } },
                    { new: true }
                );

                return upvote;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        upvoteComment: async (parent, { commentId }, context) => {
            if (context.user) {
                const comment = await Comment.findById(commentId);

                if(comment.upvotes) {
                    await Promise.all(comment.upvotes.map(async item => {
                        await Upvote.findById(item)
                        .then(({ username }) => {
                            if (username === context.user.username) {
                                throw new AuthenticationError('User has already upvoted this comment');
                            }
                        });
                    }));
                }
                console.log(context.user.username);
                const upvote = await Upvote.create({ username: context.user.username });
                await Comment.findByIdAndUpdate(
                    commentId,
                    { $push: { upvotes: upvote._id } },
                    { new: true }
                );

                return upvote;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        deleteUpvoteComment: async (parent, { _id, commentId }, context) => {
            if (context.user) {
                const upvote = await Upvote.findOneAndDelete(_id);
                await Comment.findByIdAndUpdate(
                    commentId,
                    { $pull: { upvotes: _id } },
                    { new: true }
                );

                return upvote;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //Recipe mutations

        //For creating a new Recipe that includes directions, ingredients, cookware, comments, and upvotes object id arrays.
        addRecipe: async (parent, args, context) => {
            //Context if user is creating recipe
            if (context.user) {
                const { ingredients, directions, cookware, ...editedArgs } = args;
                console.log(editedArgs);
                const recipe = await Recipe.create({ ...editedArgs, creator: context.user.username });
                await User.findByIdAndUpdate(
                    context.user._id,
                    { $push: { recipeKit: recipe._id } },
                    { new: true }
                );

                //For pushing the Step object ids up into the steps array on Recipe
                await Promise.all(args.directions.map(async stp => {
                    const direction = await Direction.create(stp);
                    await Recipe.findByIdAndUpdate(
                        recipe._id,
                        { $push: { directions: direction._id } },
                        { new: true }
                    );
                }));

                //For pushing the Ingredient object ids up into the ingredients array on Recipe
                await Promise.all(args.ingredients.map(async ing => {
                    const ingredient = await Ingredient.create(ing);
                    await Recipe.findByIdAndUpdate(
                        recipe._id,
                        { $push: { ingredients: ingredient._id } },
                        { new: true }
                    );
                }));

                //For pushing the Cookware object ids up into the cookware array on Recipe
                await Promise.all(args.cookware.map(async ware => {
                    const cookware = await Cookware.create(ware);
                    await Recipe.findByIdAndUpdate(
                        recipe._id,
                        { $push: { cookware: cookware._id } },
                        { new: true }
                    );
                }));

                return recipe;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //For saving a recipe to a user's savedRecipes list.
        saveRecipe: async (parent, args, context) => {
            const user = await User.findByIdAndUpdate(
                context.user._id,
                { $push: { savedRecipes: args._id } },
                { new: true }
            );

            return user;
        },

        //For deleting a recipe and all of it's child objects.
        deleteRecipe: async (parent, { _id }, context) => {
            //For ensuring that only logged in users can delete recipes
            if (context.user) {
                //First find the recipe with the given id and delete it
                const recipe = await Recipe.findOneAndDelete(_id)
                const { steps, ingredients, cookware, comments, upvotes } = recipe;

                await Promise.all(steps.map(async step => {
                    await Step.findOneAndDelete(
                        { _id: step },
                        { new: true }
                    )
                }));

                await Promise.all(ingredients.map(async ingredient => {
                    await Ingredient.findOneAndDelete(
                        { _id: ingredient },
                        { new: true }
                    )
                }));

                await Promise.all(cookware.map(async ware => {
                    await Cookware.findOneAndDelete(
                        { _id: ware },
                        { new: true }
                    )
                }));

                await Promise.all(comments.map(async comment => {
                    await Comment.findOneAndDelete(
                        { _id: comment },
                        { new: true }
                    )
                }));

                await Promise.all(upvotes.map(async upvote => {
                    await Upvote.findOneAndDelete(
                        { _id: upvote },
                        { new: true }
                    )
                }));

                return recipe;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;