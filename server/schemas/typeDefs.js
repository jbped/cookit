const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Ingredient {
        _id: ID
        ingredientName: String
        measurement: String
        quantity: String
        preparationNotes: String
        ingredientId: String
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
        isPublic: Boolean
        creator: String
        createdAt: String
        recipeTitle: String
        recipeDescription: String
        type: String
        season: String
        difficulty: Int
        servings: Int
        cookTime: String,
        forked: Boolean,
        directions: [Direction]
        ingredients: [Ingredient]
        cookware: [Cookware]
        comments: [Comment]
        upvotes: [Upvote]
        directionsOrder: [String]
        ingredientsOrder: [String]
    }

    type Direction {
        _id: ID
        stepText: String
        stepId: String
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
        upvotes: [Upvote]
    }

    type Upvote {
        _id: ID
        username: String
    }

    type Query {
        #User-
        me: User
        users: [User]
        user(username: String!): User
        #Ingredient-
        ingredients: [Ingredient]
        ingredient(ingredientName: String!): Ingredient
        #Comment-
        comments(recipeId: ID): [Comment]
        #Recipe-
        recipes: [Recipe]
        recipesShort: [Recipe]
        recipe(_id: ID!): Recipe
        userUpvotedRecipes: [Recipe]
    }

    type Mutation {
        #User-
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        #Ingredient-
        addIngredient(ingredientName: String!, measurement: String, quantity: Int, preparationNotes: String): Ingredient
        #Comment-
        addComment(recipeId: ID!, commentText: String!, username: String): Comment
        deleteComment(_id: ID!, recipeId: ID!): Comment
        #Upvote-
            #UpvoteRecipe
        upvoteRecipe(recipeId: ID!, username: String): Upvote
        deleteUpvoteRecipe(_id: ID! recipeId: ID!): Upvote
            #UpvoteComment
        upvoteComment(commentId: ID!, username: String): Upvote
        deleteUpvoteComment(_id: ID!, commentId: ID!): Upvote
        #Recipe-
        addRecipe(isPublic: Boolean!, creator: String, recipeTitle: String!, recipeDescription: String, type: String, season: String, difficulty: Int, servings: Int cookTime: String, directions: [directionInput], ingredients: [ingredientInput], cookware: [cookwareInput], directionsOrder: [String], ingredientsOrder: [String]): Recipe
        saveRecipe(recipeId: ID): Recipe
        deleteRecipe(_id: ID): Recipe
        #Direction-
        addDirection(recipeId: ID, stepText: String!): Direction
    }

    type Auth {
        token: ID!
        user: User
    }

    input ingredientInput {
        _id: ID
        ingredientName: String
        measurement: String
        quantity: String
        preparationNotes: String
        ingredientId: String
    }

    input directionInput {
        _id: ID
        stepText: String
        stepId: String
    }

    input cookwareInput {
        _id: ID
        cookwareName: String
    }
`;

module.exports = typeDefs;