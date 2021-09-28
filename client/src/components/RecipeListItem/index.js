// React 
import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Queries/Mutations
import { useQuery } from '@apollo/client';
import {
    QUERY_ME,
    QUERY_RECIPES_SHORT
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
  console.log("query_me data", userLoading, userData);
  const myData = userData?.me || {}

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  // Get QUERY_RECIPE data
  const { loading, recipeData } = useQuery(QUERY_RECIPES_SHORT);
  console.log("Recipe data", loading, recipeData);
  const recipe = recipeData?.recipe || {};

  return (
    <Router>
      <Switch>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
          >
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gap: 2,
              }}
            >
              <Item>
              <Button
                  component={Link}
                  to={`/recipe/:${recipe._id}`}
                  variant="text"
                >
                   <ListItem
                      elevation="4"
                      sx={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: ".1rem",
                          marginRight: ".1rem"
                      }}
                >
                      <ListItemText
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: ".1rem",
                            marginRight: ".2rem"
                          }}
                      >
                      <p>{ recipe.recipeTitle }</p>
                  <p>Recipe Name</p>
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
                    <p>{ recipe.servings}</p>
                        </ListItemText>
                      </ListItemIcon>
            </Box>
                </ListItem>
                </Button>
          </Item>
            </Box>
        </Grid>
    </Grid>
      </Switch>
    </Router>
  );
}
