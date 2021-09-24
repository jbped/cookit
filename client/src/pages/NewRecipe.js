import React from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../utils/globalSlice';

// MUI Components....
import {
  Box,
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
      <ConfirmLeavePage completed={false} />
      <NewRecipeTitle />
      <RecipeTime />
      <ServingSize />
      <PublicSwitch />
      <RecipeDescription />
      <IngredientsSection />
      <DirectionsSection />
    </Box >
  )
}

