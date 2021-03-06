import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation AddUser($Username: String!, $Email: String!, $Password: String!) {
        addUser(username: $Username, email: $Email, password: $Password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN = gql`
    mutation Login($Username: String!, $Password: String!) {
        login(username: $Username, password: $Password) {
            token
            user {
            _id
            }
        }
    }
`;

//Ingredient
export const ADD_INGREDIENT = gql`
    mutation addIngredient($ingredientName: String!, $measurement: String, $quantity: String, $preparationNotes: String) {
        addIngredient(ingredientName: $ingredientName, measurement: $measurement, quantity: $quantity, preparationNotes: $preparationNotes) {
            ingredientName
            measurement
            quantity
            preparationNotes
        }
    }
`;

//Recipe
export const ADD_RECIPE = gql`
    mutation addRecipe($isPublic: Boolean!, $recipeTitle: String!, $recipeDescription: String!,  $servings: Int!, $cookTime: String!, $directions: [directionInput], $ingredients: [ingredientInput],  $directionsOrder: [String], $ingredientsOrder: [String]) {
        addRecipe(isPublic: $isPublic, recipeTitle: $recipeTitle, recipeDescription: $recipeDescription, servings: $servings, cookTime: $cookTime, directions: $directions, ingredients: $ingredients, directionsOrder: $directionsOrder, ingredientsOrder: $ingredientsOrder) {
            _id
            creator
        isPublic
            createdAt
            recipeDescription
        recipeTitle
            servings
            cookTime
            directions {
            _id
            stepText
            stepId
            }
        forked
            ingredients {
            _id
            ingredientName
            measurement
            quantity
            preparationNotes
            ingredientId
            }
            comments {
            _id
            commentText
            createdAt
            username
            upvotes {
                _id
                username
            }
            }
            upvotes {
            _id
            username
            }
            directionsOrder
            ingredientsOrder
        }
    }
`;

export const SAVE_RECIPE = gql`
    mutation saveRecipe($recipeId: ID) {
        saveRecipe(recipeId: $recipeId) {
            _id
        }
    }
`;

export const DELETE_RECIPE = gql`
    mutation DeleteRecipe($id: ID) {
        deleteRecipe(_id: $id) {
            _id
            isPublic
            creator
            createdAt
            recipeDescription
            recipeTitle
        }
    }
`;

export const EDIT_RECIPE = gql`
    mutation editRecipe($recipeId: ID!, $isPublic: Boolean!, $recipeTitle: String!, $recipeDescription: String!,  $servings: Int!, $cookTime: String!, $directions: [directionInput], $ingredients: [ingredientInput],  $directionsOrder: [String], $ingredientsOrder: [String]) {
        editRecipe(recipeId: $recipeId, isPublic: $isPublic, recipeTitle: $recipeTitle, recipeDescription: $recipeDescription, servings: $servings, cookTime: $cookTime, directions: $directions, ingredients: $ingredients, directionsOrder: $directionsOrder, ingredientsOrder: $ingredientsOrder) {
            _id
            isPublic,
            creator,
            recipeTitle,
            recipeDescription,
            type,
            season,
            difficulty,
            servings,
            cookTime,
            forked,
            directions {
                stepText
                stepId
            }
            ingredients {
                ingredientName
                measurement
                quantity
                preparationNotes
                ingredientId
            }
            cookware {
                cookwareName
            }
            directionsOrder
            ingredientsOrder
        }
    }
`;

//Direction

export const ADD_DIRECTION = gql`
    mutation addDirection($recipeId: ID!, $stepText: String!) {
        addDirection(recipeId: $recipeId, stepText: $stepText) {
            _id
            stepText
            stepId
        }
    }
`;

//Upvote

export const UPVOTE_RECIPE = gql`
    mutation upvoteRecipe($recipeId: ID!) {
        upvoteRecipe(recipeId: $recipeId) {
            _id,
            username
        }
    }
`;

export const DELETE_UPVOTE_RECIPE = gql`
    mutation deleteUpvoteRecipe($recipeId: ID!) {
        deleteUpvoteRecipe(recipeId: $recipeId) {
            _id,
            username
        }
    }
`;