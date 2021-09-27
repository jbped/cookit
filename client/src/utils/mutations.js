import { gql } from '@apollo/client'



export const ADD_USER = gql`
    mutation addUser($Username: String!, $Email: String!, $Password: String!) {
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
    mutation Login($Email: String!, $Password: String!) {
        login(email: $Email, password: $Password) {
            token
            user {
                _id
            }
        }
    }
`;


