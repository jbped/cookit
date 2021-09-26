import { gql } from '@apollo/client'

// tester id: 614d2a2d156a9a073f7a91a6
// {
//   "_id": "614d2a2d156a9a073f7a91a6"
// }

// This is basic for now.
export const QUERY_USERS = gql`
    query users {
    users {
        _id
        username
        email
    }
    }
`;

export const QUERY_USER =gql`
    query user($Username: String!) {
    user(username: $Username) {
        _id
        username
        email
        groceryList {
        _id
        ingredientName
        measurement
        quantity
        preparationNotes
        }
        recipeKit {
        _id
        public
        creator
        createdAt
        recipeTitle
        type
        season
        difficulty
        servings
        cookTime
        ingredients {
            _id
            ingredientName
            measurement
            quantity
            preparationNotes
        }
        }
        savedRecipes {
        _id
        public
        createdAt
        creator
        recipeTitle
        type
        season
        difficulty
        servings
        cookTime
        ingredients {
            _id
            ingredientName
            measurement
            quantity
            preparationNotes
        }
        }
    }
}

    
`;

export const QUERY_ME = gql`
    {
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
            }
            recipeKit {
            _id
            public
            creator
            createdAt
            recipeTitle
            type
            season
            difficulty
            servings
            cookTime
            ingredients {
                _id
                ingredientName
                measurement
                quantity
                preparationNotes
            }
            }
            savedRecipes {
            _id
            public
            creator
            createdAt
            recipeTitle
            type
            season
            difficulty
            servings
            cookTime
            ingredients {
                _id
                ingredientName
                measurement
                quantity
                preparationNotes
            }
            }
        }
    }
    
`;

export const QUERY_ME_BASIC = gql`
    {
        me {
            _id
            username
            email
        }
    }
`;

export const QUERY_RECIPES =gql`
    query Query {
    recipes {
        _id
        public
        creator
        createdAt
        recipeTitle
        type
        season
        difficulty
        servings
        cookTime
        ingredients {
        _id
        ingredientName
        measurement
        quantity
        preparationNotes
        }
    }
    }
`;





