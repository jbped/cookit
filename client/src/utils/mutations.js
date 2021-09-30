import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation AddUser($Username: String!, $Email: String!, $Password: String!) {
        addUser(username: $Username, email: $Email, password: $Password) {
            token
            user {
            _id
            }
        }
    }
`;

export const LOGIN = gql`
    mutation Login($Email: String!, $Password: String!) {
        login(email: $Email, password: $Password) {
            token
            user {
            _id
            }
        }
    }
`;

//Ingredient
export const ADD_INGREDIENT = gql`
    mutation addIngredient($ingredientName: String!, $measurement: String, $quantity: Int!, $preparationNotes: String) {
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
    mutation addRecipe($isPublic: Boolean!, $recipeTitle: String!, $recipeDescription: String, $type: String!, $season: String!, $difficulty: Int!, $servings: Int!, $cookTime: String!, $directions: [directionInput], $ingredients: [ingredientInput], $cookware: [cookwareInput], $directionsOrder: [String], $ingredientsOrder: [String]) {
        addRecipe(isPublic: $isPublic, recipeTitle: $recipeTitle, recipeDescription: $recipeDescription, servings: $servings, cookTime: $cookTime, directions: $directions, ingredients: $ingredients, directionsOrder: $directionsOrder, ingredientsOrder: $ingredientsOrder) {
            _id
            isPublic
            creator
            recipeTitle
            recipeDescription
            servings
            cookTime
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
            directionsOrder
            ingredientOrder
        }
    }
`;

export const SAVE_RECIPE = gql`
    mutation saveRecipe($_id: ID) {
        saveRecipe(_id: $_id) {
            _id
        }
    }
`;

export const DELETE_RECIPE = gql`
    mutation deleteRecipe($_id: ID) {
        deleteRecipe(_id: $_id) {
            _id
            recipeTitle
            recipeDescription
        }
    }
`;

export const EDIT_RECIPE = gql`
    mutation editRecipe($recipeId: ID!, $isPublic: Boolean, $recipeTitle: String, $recipeDescription: String, $type: String!, $season: String!, $difficulty: Int!, $servings: Int!, $cookTime: String!, $directions: [directionInput], $ingredients: [ingredientInput], $cookware: [cookwareInput], $directionsOrder: [String], $ingredientsOrder: [String]) {
        editRecipe(recipeId: $recipeId, isPublic: $isPublic, recipeTitle: $recipeTitle, recipeDescription: $recipeDescription, type: $type, season: $season, difficulty: $difficulty, servings: $servings, cookTime: $cookTime, directions: $directions, ingredients: $ingredients, cookware: $cookware, directionsOrder: $directionsOrder, ingredientsOrder: $ingredientsOrder) {
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