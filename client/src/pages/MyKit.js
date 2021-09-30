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

  const toggleView = () => {
    dispatch(toggleMyKitView());
  };

  // Get QUERY_ME data
  const { loading, data } = useQuery(QUERY_ME);

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
        <Grid container>
          {recipes.map((recipe) => (
            <Grid item xs={12} md={6}>
              <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>
            </Grid>
          ))}
        </Grid>
      )}
      <Grid container>
        <Grid item xs={12} md={6}></Grid>
        {/* Forked Recipes */}
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </Box>
  );
}

/*    <Box
        mx={{ xs: 0, md: 5, xl: 20 }}
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box px={{ md: 5, xl: 20 }}>
          <Box
            sx={{
              mt: 2,
              borderBottom: 1,
              borderColor: 'divider',
              margin: 2
            }}
          >
            <Typography variant='h5' color='secondary'>
              My Recipes
            </Typography>
          </Box>
          <Grid container spacing={{ md: 5, lg: 10 }}>
            <Grid item xs={12} md={6}>
              <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
                <Box key={`-box`}>
                  {recipes.map(recipe => (
                    <ListItem>
                      <RecipeCard key={recipe._id} recipe={recipe} />
                    </ListItem>
                  ))}
                </Box>
              </List>
            </Grid>
          </Grid>
          {view ?
            (
              <Grid item xs={12} md={6}>
                <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
                  <Box key={`-box`}>
                    {recipes.map(recipe => (<Typography>hello world</Typography>))}
                  </Box>
                </List>
              </Grid>
            )
            :
            (
              <Grid item xs={12} md={6}>
                <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
                  <Box key={`-box`}>
                    {recipes.map(recipe => (
                      <ListItem>
                        <RecipeListItem key={recipe._id} recipe={recipe} />
                      </ListItem>
                    )
                    )}
                  </Box>
                </List>
              </Grid>
            )
          }
        </Box>*/
