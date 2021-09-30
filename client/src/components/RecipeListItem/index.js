// React 
import * as React from 'react';
import {
  BrowserRouter,
  Link
} from "react-router-dom";

// Queries/Mutations
import { useQuery } from '@apollo/client';
import {
  QUERY_ME,
  // QUERY_RECIPES_SHORT
} from '../../utils/queries';

// React Components
import ViewRecipe from "../../pages/ViewRecipe";

// Auth
import Auth from "../../utils/auth";

// Material UI components
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

// Material UI methods
import { styled } from '@mui/material/styles';

// react-icons
import { IoMdTimer, IoIosPeople } from "react-icons/io";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function RecipeListItem() {
  // Get QUERY_ME data
  const {userLoading, userData} = useQuery(QUERY_ME);
  // console.log("query_me data", userLoading, userData);
  const myData = userData?.me || {}

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  // Get QUERY_RECIPES_SHORT data
  // const { loading, recipeData } = useQuery(QUERY_RECIPES_SHORT);
  // console.log("Recipe data", loading, recipeData);
  // const recipes = recipeData?.recipe || {};

  const recipe = {
    "_id": "614fe7e963526de392b539b5",
    "isPublic": true,
    "creator": "BoDee_Angus",
    "createdAt": "09/25/2021 at 9:24 PM",
    "recipeTitle": "Fried Eggs",
    "recipeDescription": "Eggs fried in a pan filled with butter, salted and peppered to perfection.",
    "type": "Dinner",
    "season": "All",
    "difficulty": 1,
    "servings": 6,
    "cookTime": "1 hour",
    "directions": [
      {
        "stepId": "step-1",
        "stepText": "First, melt butter on pan at medium heat."
      },
      {
        "stepId": "step-2",
        "stepText": "Then, crack eggs onto pan gently."
      },
      {
        "stepId": "step-3",
        "stepText": "Salt and pepper the eggs, and then wait until the edges solidify completely."
      },
      {
        "stepId": "step-4",
        "stepText": "Flip eggs over, and let sit for a minute or two. After take off heat and serve."
      }
    ],
    "directionsOrder": ["step-1", "step-2", "step-3", "step-4"],
    "ingredients": [
      {
        "ingredientId": "ingredient-1",
        "measurement": null,
        "ingredientName": "Eggs",
        "quantity": "2",
        "preparationNotes": "large"
      },
      {
        "ingredientId": "ingredient-2",
        "measurement": "Tbsp",
        "ingredientName": "Butter",
        "quantity": "2",
        "preparationNotes": "Salted"
      },
      {
        "ingredientId": "ingredient-3",
        "measurement": "c",
        "ingredientName": "Sour Cream",
        "quantity": "1/2",
        "preparationNotes": ""
      }
    ],
    "ingredientsOrder": ["ingredient-1", "ingredient-3", "ingredient-2"],
    "comments": [
      {
        "_id": "614fe7f963526de392b539d0",
        "commentText": "Wow this was delicious!",
        "username": "BoDee_Angus",
        "upvotes": [
          {
            "_id": "614feb27c6da2f76bdc176f2",
            "username": null
          }
        ]
      }
    ],
    "upvotes": [
      {
        "_id": "614feb21c6da2f76bdc176ee",
        "username": "BoDee_Angus"
      }
    ]
  }

  return (
      <Box sx={{ m: 2, bgcolor: 'background.default', display: 'grid', gap: 2 }}>
        <Item>
          <Button component={Link} to={`/recipe/${recipe._id}`} variant="text">
            <ListItem elevation="4"
              sx={{
                p: 0,
                display: "flex",
                alignItems: "center",
              }}>
              <ListItemText
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: ".1rem",
                  marginRight: ".5rem",
                  color: 'white'
                }}
              >
                <p>{recipe.recipeTitle}</p>
                {/* <p>Recipe Name</p> */}
              </ListItemText>
              {/* Use MUI rating precision component if there is enought time*/}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: ".1rem",
                  }}
                >
                  <IoMdTimer />
                  <ListItemText
                    sx={{
                      color: "secondary",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: ".3rem"
                    }}
                  >
                    <p>{recipe.cookTime}</p>
                  </ListItemText>
                </ListItemIcon>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: ".8rem"
                }}
              >
                <ListItemIcon
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: ".2rem",
                  }}
                >
                  <IoIosPeople />
                  <ListItemText
                    sx={{
                      color: "secondary",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: ".3rem"
                    }}
                  >
                    <p>{recipe.servings}</p>
                  </ListItemText>
                </ListItemIcon>
              </Box>
            </ListItem>
          </Button>
        </Item>
      </Box>
  );
}
