import { gql } from '@apollo/client'

// tester id: 614d2a2d156a9a073f7a91a6
// {
//   "_id": "614d2a2d156a9a073f7a91a6"
// }

// This is basic for now.
// Returns just id username and email
export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
        }
    }
`;

// Returns everything for a specific user
export const QUERY_USER =gql`
    query user ($Username: String!) {
        user(username: $Username) {
            _id
            email
            username
            groceryList {
                _id
                ingredientName
                measurement
                quantity
                preparationNotes
            }
            recipeKit {
                _id
                creator
                public
                createdAt
                recipeTitle
                recipeDescription
                servings
                cookTime
                steps {
                    _id
                    stepText
                    stepNumber
                }
                ingredients {
                    _id
                    ingredientName
                    measurement
                    quantity
                    preparationNotes
                }
                cookware {
                    _id
                    cookwareName
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
            }
            savedRecipes {
                _id
                public
                creator
                createdAt
                recipeTitle
                recipeDescription
                servings
                cookTime
                steps {
                    _id
                    stepText
                    stepNumber
                }
                ingredients {
                    _id
                    ingredientName
                    measurement
                    quantity
                    preparationNotes
                }
                cookware {
                    _id
                    cookwareName
                }
                comments {
                    _id
                    commentText
                    createdAt
                    username
                    upvotes {
                    username
                    _id
                    }
                }
                upvotes {
                    _id
                    username
                }
            }
        }
    }
`;

// All info
export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            groceryList {
            _id
            ingredientName
            measurement
            quantity
            preparationNotes
            ingredientId
            }
            recipeKit {
            _id
            isPublic
            creator
            createdAt
            recipeTitle
            recipeDescription
            servings
            cookTime
            directions {
                _id
                stepText
                stepId
            }
            ingredients {
                _id
                ingredientName
                measurement
                quantity
                preparationNotes
                ingredientId
            }
            directionsOrder
            ingredientsOrder
            }
            savedRecipes {
            isPublic
            _id
            creator
            createdAt
            recipeTitle
            recipeDescription
            servings
            cookTime
            directions {
                _id
                stepText
                stepId
            }
            ingredients {
                _id
                measurement
            ingredientName
                quantity
                ingredientId
            preparationNotes
            }
            directionsOrder
            ingredientsOrder
            }
        }
    }
`;

// Basic info
export const QUERY_ME_BASIC = gql`
    query me_basic {
        me {
            _id
            username
            email
        }
    }
`;

// All recipes
export const QUERY_RECIPES =gql`
    query recipes {
        recipes {
            _id
            public
            creator
            createdAt
            recipeTitle
            recipeDescription
            type
            season
            difficulty
            servings
            cookTime
            steps {
                _id
                stepText
                stepNumber
            }
            ingredients {
                _id
                ingredientName
                measurement
                quantity
                preparationNotes
            }
            cookware {
                _id
                cookwareName
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
        }
    }
`;

export const QUERY_RECIPE = gql`
    query Query($recipeId: ID!) {
    recipe(_id: $recipeId) {
        _id
        creator
        isPublic
        createdAt
        recipeDescription
        recipeTitle
        servings
        cookTime
        directions {
        stepText
        stepId
        _id
        }
        ingredients {
        _id
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

export const QUERY_RECIPES_SHORT =gql`
    query Query {
        recipes {
            _id
            creator
            createdAt
            recipeTitle
            recipeDescription
            servings
            cookTime
            ingredients {
                ingredientName
            }
        }
    }
`;

export const QUERY_RECIPE_BASIC =gql`
    query Query ($_id: ID!) {
        recipes (_id: $_id) {
            _id
            public
            creator
            createdAt
            recipeTitle
            servings
            cookTime
            directions {
                _id
                stepText
                stepId
            }
        }
    }
`;

// Not working right now
// export const QUERY_RECIPE = gql`

// `;

// all ingredients
export const QUERY_INGREDIENTS = gql`
    query ingredients {
        ingredients {
            _id
            ingredientName
            measurement
            quantity
            preparationNotes
        }
    }
`;

// Ingredient by name
export const QUERY_INGREDIENT = gql`
    query ingredient($IngredientName: String!) {
        ingredient(ingredientName: $IngredientName) {
            _id
            ingredientName
            measurement
            quantity
            preparationNotes
        }
    }
`;