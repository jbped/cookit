// Import React components
import * as React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { toggleMyKitView } from '../utils/globalSlice';
// Queries/Mutations
import { useQuery, useMutation } from '@apollo/client';
import {
  QUERY_ME,
  QUERY_RECIPE_BASIC
} from '../utils/queries';

// Auth
import Auth from '../utils/auth.js';

// Import MUI components
import {
  Grid,
  Box,
  Divider,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';

// Custom Components....
import RecipeCard from '../components/RecipeCard';
import RecipeListItem from '../components/RecipeListItem';
import Loader from '../components/Loader'



export default function MyKit() {
  const view = useSelector(state => state.global.myKitView);
  const dispatch = dispatch();

  const toggleView = () => {
    dispatch(toggleMyKitView());
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));

  // Get QUERY_ME data
  const { loading, data } = useQuery(QUERY_ME);
  
  const myData = data?.me || {};

  // console.log('query_me data', loading, myData);

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (loading) {
    return <Loader></Loader>
  }

  const recipes = [...myData.recipeKit]

  console.log(recipes)
  
  // based on query me data pull all the recipes into the mykit page
  // const recipeId = "6155f06d904fa9fcbbc99922";

  // const { loading, data } = useQuery(QUERY_RECIPE_BASIC, {
  //   variables: { recipeId: recipeId }
  // });

  
  // console.log("this is the recipe returned", recipe)

  // recipes += recipes


  


  return (
    <Box
      mx={{ xs: 0, md: 5, xl: 20 }}
      sx={{
        pt: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      <Typography variant='h4' fontWeight='bold' color='primary' sx={{ alignSelf: 'flex-start' }}>
        My Kit
      </Typography>
      <Box px={{ md: 5, xl: 20 }} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignSelf: 'flex-start', flexBasis: '100%'}}>
          <Typography variant='h5' color='secondary'>
            My Recipes
          </Typography>
          <IconButton onClick={}><GridViewSharpIcon/></IconButton>
        </Box>
        <Grid container spacing={{ md: 5, lg: 10 }}>
          {listView ? (
                <Box key={`-box`}>
                      {/* <ListItem>
                        <RecipeCard key={recipe._id} recipe={recipe} />
                        {/* <ListItemText
                          // primary={}
                          // secondary={ ? : ' '}
                          /> */}
                      {/* </ListItem>  */}
                    {recipes.map(recipe => (
                      <ListItem>
                        <RecipeCard key={recipe._id} recipe={recipe} />
                        <ListItemText
                          // primary={}
                          // secondary={ ? : ' '}
                          />
                      </ListItem>
                      )
                    )}
                  {/* <Divider /> */}
                </Box>
          ) : (
            <Grid item xs={12} md={6}>
              <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
                <Box key={`-box`}>
                {recipes.map(recipe => (
                      <ListItem>
                        <RecipeListItem key={recipe._id} recipe={recipe} />
                        <ListItemText
                          // primary={}
                          // secondary={ ? : ' '}
                          />
                      </ListItem>
                      )
                )}
                  {/* <ListItem>
                    <RecipeListItem />
                    {/* <ListItemText
                    // primary={}
                    // secondary={ ?  : '-'}
                    /> */}
                  {/* </ListItem>  */}
                  {/* <Divider /> */}
                </Box>
              </List>
            </Grid>
          )}
        </Grid>
        {/* </Paper> */}
      </Box>
    </Box>
  );
}

{
  /* <Grid item xs={12} md={6}>
          <Box sx={{
            mt: 2,
            borderBottom: 1,
            borderColor: 'divider'
          }}>
            <Typography variant="h5" color="primary">Shopping List</Typography>
          </Box >          
            <Typography>Shopping List Component should go here.</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{
            mt: 2,
            borderBottom: 1,
            borderColor: 'divider'
          }}>
            <Typography variant="h5" color="primary">Meal Planner</Typography>
          </Box >
            <Typography>Meal Planner component should go here.</Typography>
        </Grid> */
}
