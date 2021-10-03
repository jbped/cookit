import React from 'react'
import { useQuery } from '@apollo/client';

// Redux State....
import { useSelector, useDispatch } from 'react-redux';
import { toggleDiscoverView } from '../utils/globalSlice';

// IndexedDB
import { idbPromise } from '../utils/helpers';

import {
  QUERY_RECIPES
} from '../utils/queries';

import {
  Grid,
  Box,
  Typography,
  List,
  IconButton,
} from '@mui/material';

import Loader from '../components/Loader'

import RecipeListItem from '../components/RecipeListItem';
import RecipeCard from '../components/RecipeCard';

import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import DehazeSharpIcon from '@mui/icons-material/DehazeSharp';

export default function RecipeFeed() {
  const view = useSelector((state) => state.global.discoverView);
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_RECIPES)
  console.log("All recipes", data)

  const toggleView = () => {
    dispatch(toggleDiscoverView());
  };

  if (loading) {
    return <Loader></Loader>;
  }

  const recipes = data.recipes || {};

  if (recipes.length) {
    recipes.forEach((recipe) => {
      idbPromise('recipes', 'put', recipe);
    })
  }

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
          <Typography variant='h4' fontWeight='bold' color='primary'>
            Discover Recipes
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

      <Grid container>
        <Grid item xs={12} md={6}></Grid>
        {/* Forked Recipes */}
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </Box>
  );
}

