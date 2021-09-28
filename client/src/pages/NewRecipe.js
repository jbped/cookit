import React from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../utils/globalSlice';

// MUI Components....
import {
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material'

// Custom Components.... 
import ConfirmLeavePage from '../components/ConfirmLeavePage'
import NewRecipeTitle from '../components/NewRecipeComponents/NewRecipeTitle';
import RecipeTime from '../components/NewRecipeComponents/RecipeTime';
import ServingSize from '../components/NewRecipeComponents/ServingSize';
import PublicSwitch from '../components/NewRecipeComponents/PublicSwitch';
import RecipeDescription from '../components/NewRecipeComponents/RecipeDescription';
import IngredientsSection from '../components/NewRecipeComponents/IngredientsSection';
import DirectionsSection from '../components/NewRecipeComponents/DirectionsSection';

export default function NewRecipe() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();

  return (
    <Box component="form">
      <NewRecipeTitle />
      <ConfirmLeavePage completed={false} />

      <Grid container spacing={{ md: 5, xl: 10 }}  px={{ md: 5, xl: 10 }}>

        <Grid item xs={12} md={6}>
          <Box sx={{borderBottom: 1, borderColor: 'divider', mt: 3}}>
            <Typography variant="h5" color="primary">Details</Typography>
          </Box>
          <Paper sx={{p:2, mt: 2}}>
            <RecipeTime />
            <ServingSize />
            <PublicSwitch />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <RecipeDescription />
        </Grid>

      </Grid>

      <Grid container spacing={{ md: 5, xl: 10 }} px={{ md: 5, xl: 10 }}>

        <Grid item xs={12} md={6}>
          <IngredientsSection />
        </Grid>

        <Grid item xs={12} md={6}>
          <DirectionsSection />
        </Grid>

      </Grid>
    </Box >
  )
}

