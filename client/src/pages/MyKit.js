// Import React components
import * as React from 'react';
import {
  Link
} from "react-router-dom";

// Redux State....
import { useSelector, useDispatch } from 'react-redux';
import { toggleMyKitView } from '../utils/globalSlice';
// Queries/Mutations
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Redirect } from 'react-router-dom';

// Auth
import Auth from '../utils/auth';
// import { idbPromise } from '../utils/helpers';

// Import MUI components
import {
  Grid,
  Box,
  Paper,
  Typography,
  List,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import DehazeSharpIcon from '@mui/icons-material/DehazeSharp';

import RestaurantIcon from '@mui/icons-material/Restaurant';

// Custom Components....
import RecipeCard from '../components/RecipeCard';
import RecipeListItem from '../components/RecipeListItem';
import Loader from '../components/Loader';

export default function MyKit() {
  const view = useSelector((state) => state.global.myKitView);
  const dispatch = useDispatch();
  const [tab, setTab] = React.useState(0)

  // Get QUERY_ME data
  const { loading, data } = useQuery(QUERY_ME);

  if (!Auth.loggedIn()) {
    return <Redirect to="/discover" />
  }

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const toggleView = () => {
    dispatch(toggleMyKitView());
  };

  const myData = data?.me || {};
  // console.log('query_me data', loading, myData);

  // const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (loading) {
    return <Loader></Loader>;
  }

  // const idbRecipes = idbPromise('recipes', 'get');
  // const idbForkedRecipes = idbPromise('forkedRecipes', 'get');

  // let recipes = [];
  // let forkedRecipes = [];

  const recipes = Object.keys(myData).length > 0 ? [...myData.recipeKit] : [];
  // if (Object.keys(myData).length > 0) {
  //   recipes = [...myData.recipeKit];
  // } else if (idbRecipes.length > 0) {
  //   recipes = idbRecipes;
  // } else {
  //   recipes = [];
  // }
  
  const forkedRecipes = Object.keys(myData).length > 0 ? [...myData.savedRecipes] : [];
  // if (Object.keys(myData).length > 0) {
  //   forkedRecipes = [...myData.savedRecipes];
  // } else if (idbForkedRecipes.length > 0) {
  //   forkedRecipes = idbForkedRecipes;
  // } else {
  //   forkedRecipes = [];
  // }

  // console.log('recipes', recipes);

  // if (recipes.length) {
  //   recipes.forEach((recipe) => {
  //     idbPromise('recipes', 'put', recipe)
  //   })
  // }

  // if (forkedRecipes.length) {
  //   forkedRecipes.forEach((forkedRecipe) => {
  //     idbPromise('forkedRecipes', 'put', forkedRecipe);
  //   })
  // }

  return (
    <Box mx={{ xs: 0, md: 5, xl: 20 }}>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '.4rem',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h4' fontWeight='bold' color='primary'>
            My Kit
          </Typography>
        </Box>
        <IconButton onClick={toggleView}>
          {view ? (
            <GridViewSharpIcon />
          ) : (
            <DehazeSharpIcon />
          )}
        </IconButton>
      </Box>
      <Paper sx={{ width: '100%', mt: 2 }}>
        <Tabs value={tab} onChange={handleChange} variant='fullWidth' textColor='secondary' indicatorColor='secondary'>
          <Tab label="My Recipes" sx={{ fontSize: 18, color: 'backdrop.light' }} />
          <Tab label="Forked Recipes" sx={{ fontSize: 18, color: 'backdrop.light' }} />
        </Tabs>
      </Paper>
      {tab === 0 ? (
        <Box sx={{
          mt: 2,
          borderTop: 1,
          borderColor: 'divider'
        }}>
          {/* My Recipes */}
          {recipes.length > 0 ? (
            <Box>
              {view ? (
                //True === ROW
                <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
                  {recipes.map((recipe) => (
                    <Box key={recipe._id}>
                      <RecipeListItem key={`${recipe._id}-row`} recipe={recipe}></RecipeListItem>
                    </Box>
                  ))}
                </List>
              ) : (
                // False === Tiles
                <Grid container mt={2} rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                  {recipes.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={`${recipe._id}-grid`}>
                      <RecipeCard recipe={recipe}></RecipeCard>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>

          ) : (
            <Box
              sx={{
                mt: 2,
                top: 'auto',
                bottom: 'auto',
                borderColor: 'divider',
              }}
            >
              <Typography variant='h5' color='white' sx={{ textAlign: 'center', flexGrow: 1 }}>
                Looks awfully empty in here! Lets get started with adding <Typography component={Link} to="/new-recipe" variant='h5' color='secondary'>your very first recipe!</Typography>
              </Typography>
            </Box>
          )}

        </Box>

      ) : (

        <Box sx={{
          mt: 2,
          borderTop: 1,
          borderColor: 'divider'
        }}>
          {/* Forked Recipes */}
          {forkedRecipes.length > 0 ? (

            <Box>
              {view ? (
                //True === ROW
                <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
                  {forkedRecipes.map((recipe) => (
                    <Box key={recipe._id}>
                      <RecipeListItem key={`${recipe._id}-row`} recipe={recipe}></RecipeListItem>
                    </Box>
                  ))}
                </List>
              ) : (
                // False === Tiles
                <Grid container mt={2} rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                  {forkedRecipes.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={`${recipe._id}-grid`}>
                      <RecipeCard recipe={recipe}></RecipeCard>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>

          ) : (

            <Box mt={2}>
              <Typography variant='h5' color='white' sx={{ textAlign: 'center', flexGrow: 1 }}>
                Looks awfully empty in here! You can fork your very first recipe by clicking the <RestaurantIcon /> icon found on any recipe. Doing so will save that recipe to your Kit.  <Typography component={Link} to="/discover" variant='h5' color='secondary'>Discover recipes that others have shared!</Typography>
              </Typography>
            </Box>
          )}

        </Box>

      )}


    </Box>
  );
}
