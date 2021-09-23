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
                  .populate('groceryList');

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
              .populate('groceryList');
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
                const recipe = await Recipe.create(args);
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { recipeKit: recipe._id } },
                    { new: true }
                );

                return recipe;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;