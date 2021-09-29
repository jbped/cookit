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
    mutation addRecipe($isPublic: Boolean!, $recipeTitle: String!, $recipeDescription: String, $servings: Int!, $cookTime: String!, $directions: [directionInput], $ingredients: [ingredientInput], $directionsOrder: [String], $ingredientsOrder: [String]) {
        addRecipe(isPublic: $isPublic, recipeTitle: $recipeTitle, recipeDescription: $recipeDescription, servings: $servings, cookTime: $cookTime, directions: $directions, ingredients: $ingredients, directionsOrder: $directionsOrder, ingredientsOrder: $ingredientsOrder) {
            _id
            public
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
            ingredientsOrder
        }
    }
`;

//NOT FUNCTIONAL
// export const SAVE_RECIPE = gql`
//     mutation saveRecipe($_id: ID) {
//         saveRecipe(_id: $_id) {
//             _id
//         }
//     }
// `;

export const DELETE_RECIPE = gql`
    mutation deleteRecipe($_id: ID) {
        deleteRecipe(_id: $_id) {
            _id
            recipeTitle
            recipeDescription
        }
    }
`;

//Direction