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
        savedRecipes: [Recipe]
    }

    type Recipe {
        _id: ID
        public: Boolean
        creator: String
        createdAt: String
        recipeTitle: String
        recipeDescription: String
        type: String
        season: String
        difficulty: Int
        servings: Int
        cookTime: Int
        steps: [Step]
        ingredients: [Ingredient]
        cookware: [Cookware]
        comments: [Comment]
    }

    type Step {
        _id: ID
        stepText: String
        stepNumber: Int
    }

    type Cookware {
        _id: ID
        cookwareName: String
    }

    type Comment {
        _id: ID
        commentText: String
        createdAt: String
        username: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        ingredients: [Ingredient]
        ingredient(ingredientName: String!): Ingredient
        comments(recipeId: ID): [Comment]
        recipes: [Recipe]
        recipe: Recipe
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addIngredient(ingredientName: String!, measurement: String, quantity: Int, preparationNotes: String): Ingredient
        addComment(recipeId: ID!, commentText: String!, username: String): Comment
        addRecipe(public: Boolean!, creator: String, recipeTitle: String!, recipeDescription: String, type: String, season: String, difficulty: Int, servings: Int cookTime: Int, steps: [stepInput], ingredients: [ingredientInput], cookware: [cookwareInput]): Recipe
        saveRecipe(_id: ID): Recipe
        deleteRecipe(_id: ID): Recipe
    }

    type Auth {
        token: ID!
        user: User
    }

    input ingredientInput {
        _id: ID
        ingredientName: String
        measurement: String
        quantity: Int
        preparationNotes: String
    }

    input stepInput {
        _id: ID
        stepText: String
        stepNumber: Int
    }

    input cookwareInput {
        _id: ID
        cookwareName: String
    }
`;

module.exports = typeDefs;