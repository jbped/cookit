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
import { QUERY_ME, QUERY_RECIPE_BASIC } from '../utils/queries';
import { Redirect } from 'react-router-dom';

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
  IconButton,
} from '@mui/material';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import DehazeSharpIcon from '@mui/icons-material/DehazeSharp';

// Custom Components....
import RecipeCard from '../components/RecipeCard';
import RecipeListItem from '../components/RecipeListItem';
import Loader from '../components/Loader';

export default function MyKit() {
  const view = useSelector((state) => state.global.myKitView);
  const dispatch = useDispatch();

  // Get QUERY_ME data
  const { loading, data } = useQuery(QUERY_ME);
  
  if (!Auth.loggedIn()) {
    return <Redirect to="/feed" />
  }

  const toggleView = () => {
    dispatch(toggleMyKitView());
  };

  const myData = data?.me || {};
  console.log('query_me data', loading, myData);

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  
  if (loading) {
    return <Loader></Loader>;
  }
  
  const recipes = Object.keys(myData).length > 0 ? [...myData.recipeKit] : [];
  console.log('recipes', recipes);

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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' fontWeight='bold' color='primary'>
            My Kit
          </Typography>
        </Box>
      </Box>
      {/* My Recipes */}
      <Box
        sx={{
          mt: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant='h5' color='secondary'>
          My Recipes
        </Typography>
        <IconButton onClick={toggleView}>
        {view ? (
            <GridViewSharpIcon />
            ) : (
            <DehazeSharpIcon />
        )}
        </IconButton>
        
      </Box>

      {view ? (
        //True === ROW
        <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
            {recipes.map((recipe) => (
              <Box key={recipe._id}>
                <RecipeListItem key={recipe._id} recipe={recipe}></RecipeListItem>
              </Box>
            ))}
        </List>
      ) : (
        // False === Tiles
        <Grid container mt={2} rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>
            </Grid>
          ))}
        </Grid>
      )}
      
    </Box>
  );
}

//<Grid container>
  //      <Grid item xs={12} md={6}></Grid>
    //    {/* Forked Recipes */}
      //  <Grid item xs={12} md={6}></Grid>
//</Grid>