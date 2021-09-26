// React 
import * as React from 'react';

// Queries/Mutations
import { useQuery, useMutation } from '@apollo/client';
import {
    QUERY_ME,
    QUERY_RECIPES
} from '../../utils/queries';

// Auth
import Auth from "../../utils/auth";

// Material UI components
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Material UI methods
import { styled } from '@mui/material/styles';

// react-icons
// import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { BiUpvote } from "react-icons/bi";
import { IoMdTimer, IoIosPeople } from "react-icons/io";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));


export default function RecipeListItem() {
  // Get QUERY_ME data
  // const {loading, data} = useQuery(QUERY_ME);
  // console.log("query_me data", loading, data);
  // const userData = data?.me || {;}

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  // Get QUERY_RECIPE data
  // const { loading, data } = useQuery(QUERY_RECIPE);
  // console.log("Recipe data", loading, data);
  // const recipeData = data?.recipe || {};

  return (
    <Grid container spacing={2}>
        <Grid item xs={6} lg={4}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gap: 2,
              }}
            >
          <Item>
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
                {/* uncomment when recipe query is implemented */}
                {/* <p>{ recipeData.recipeTitle }</p> */}
                <p>Recipe Name</p>
              </ListItemText>
              {/* Use MUI rating precision component */}
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
                    {/* <p>{recipeData.cookTime}</p> */}
                    <p>25 minutes</p>
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
                      <BiUpvote />              
                  <ListItemText
                  sx={{
                    color: "secondary",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: ".3rem"
                    }}
                  >
                    {/* <p>{ recipeData.upvotes.length}</p> */}
                    <p>14</p>
                        </ListItemText>
                      </ListItemIcon>
            </Box>
                </ListItem>
                  </Item>
            </Box>
        </Grid>
    </Grid>
  );
}
