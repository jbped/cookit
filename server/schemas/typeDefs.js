const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Ingredient {
        _id: ID
        ingredientName: String
        measurement: String
        quantity: Int
        preparationNotes: String
    }

    type User {
        _id: ID
        username: String
        email: String
        groceryList: [Ingredient]
        recipeKit: [Recipe]
    }

    type Recipe {
        _id: ID
        public: Boolean
        user: User
        createdAt: String
        recipeTitle: String
        type: String
        season: String
        difficulty: Int
        servings: Int
        cookTime: Int
        ingredients: [Ingredient]
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        ingredients: [Ingredient]
        ingredient(ingredientName: String!): Ingredient
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addIngredient(ingredientName: String!, measurement: String, quantity: Int!, preparationNotes: String): Ingredient
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;