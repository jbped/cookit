const { AuthenticationError } = require('apollo-server-express');
const { User, Ingredient, Recipe } = require('../models');
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
              .populate('ingredients');
        }
    },
    Mutation: {

        //Ingredient mutations
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
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        //Recipe mutations
        addRecipe: async (parent, args, context) => {
            //Context if user is creating recipe
            if (context.user) {
                console.log(args);
                const { ingredients, ...editedArgs } = args;
                const recipe = await Recipe.create({ ...editedArgs, creator: context.user.username });
                await User.findByIdAndUpdate(
                     context.user._id,
                    { $push: { recipeKit: recipe._id } },
                    { new: true }
                );
                await Promise.all(args.ingredients.map(async ing => {
                    const ingredient = await Ingredient.create(ing);
                    await Recipe.findByIdAndUpdate(
                        recipe._id,
                        { $push: { ingredients: ingredient._id} },
                        { new: true }
                    );
                }));

                return recipe;
            }

            throw new AuthenticationError('You need to be logged in!');
        },


        //For saving a recipe to a user's savedRecipes list.
        saveRecipe: async (parent, args, context) => {
            console.log(context.user);
            const user = await User.findByIdAndUpdate(
                context.user._id,
                { $push: { savedRecipes: args._id} },
                { new: true }
            );

            return user;
        }
    }
};

module.exports = resolvers;