const { AuthenticationError } = require('apollo-server-express');
const { User, Ingredient, Recipe, Step, Cookware } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        ingredients: async () => {
            return Ingredient.find()
        },

        ingredient: async (parent, { ingredientName }) => {
            return Ingredient.findOne({ ingredientName })
        },

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

        recipes: async () => {
            return Recipe.find()
                .populate('steps')
                .populate('ingredients');
        },

        recipe: async (parent, { _id }) => {
            return Recipe.findOne(_id)
            .populate('steps')
            .populate('ingredients')
            .populate('cookware');
        }
    },

    Mutation: {
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

        //User mutations

        //For creating a new User and token for that User.
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        //For allowing an existing User to login after their token has expired.
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
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

        //Recipe mutations

        //For creating a new Recipe that includes steps, ingredients, cookware, comments, and upvotes object id arrays.
        addRecipe: async (parent, args, context) => {
            //Context if user is creating recipe
            if (context.user) {
                const { ingredients, steps, cookware, ...editedArgs } = args;
                const recipe = await Recipe.create({ ...editedArgs, creator: context.user.username });
                await User.findByIdAndUpdate(
                    context.user._id,
                    { $push: { recipeKit: recipe._id } },
                    { new: true }
                );

                //For pushing the Step object ids up into the steps array on Recipe
                await Promise.all(args.steps.map(async stp => {
                    const step = await Step.create(stp);
                    await Recipe.findByIdAndUpdate(
                        recipe._id,
                        { $push: { steps: step._id } },
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
        deleteRecipe: async(parent, { _id }, context) => {
            //For ensuring that only logged in users can delete recipes
            if(context.user) {
                //First find the recipe with the given id and delete it
                await Recipe.findOneAndDelete(
                    { _id: _id },
                    { new: true }
                //Then delete all documents that are associated in Recipe's referencing object arrays.
                ).then(async ({ steps, ingredients, cookware }) => {
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
                });
            } else {
                throw new AuthenticationError('You need to be logged in!');
            }
        }
    }
};

module.exports = resolvers;