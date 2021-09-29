import React, { useState, useEffect } from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../utils/globalSlice';

// MUI Components....
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';


// Custom Components.... 
import ConfirmLeavePage from '../components/ConfirmLeavePage'
import NewRecipeTitle from '../components/NewRecipeComponents/NewRecipeTitle';
import RecipeTime from '../components/NewRecipeComponents/RecipeTime';
import ServingSize from '../components/NewRecipeComponents/ServingSize';
import PublicSwitch from '../components/NewRecipeComponents/PublicSwitch';
import RecipeDescription from '../components/NewRecipeComponents/RecipeDescription';
import IngredientsSection from '../components/NewRecipeComponents/IngredientsSection';
import DirectionsSection from '../components/NewRecipeComponents/DirectionsSection';


function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={'up'} in={!trigger}>
      {children}
    </Slide>
  );
}

export default function NewRecipe() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const { recipeTitle, cookTime, recipeDescription, ingredients, directions, columns: { ingredientsCol, directionsCol }, ingredientErrors, directionErrors } = recipeForm;
  const dispatch = useDispatch();

  // If true display the save button
  const [softComplete, setSoftComplete] = useState(false)

  // Runs every time recipeForm state updates
  useEffect(() => {
    // Booleans that are updated if minimum items are provided. This is a soft check, hard check will come when user subs form.
    const softChecks = {
      recipeTitle: false,
      cookTime: false,
      recipeDescription: false,
      ingredients: false,
      directions: false,
      ingredientsOrder: false,
      directionsOrder: false
    }

    // Get ingredients and directions object lengths
    let ingredientsLength = Object.keys(ingredients).length
    let directionsLength = Object.keys(directions).length

    // If conditions are met update appropriate key in softChecks to true, else turn it to false
    recipeTitle.length > 5 && recipeTitle !== 'New Recipe' ? softChecks.recipeTitle = true : softChecks.recipeTitle = false;
    cookTime.length ? softChecks.cookTime = true : softChecks.cookTime = false;
    recipeDescription.length >= 5 ? softChecks.recipeDescription = true : softChecks.recipeDescription = false;
    ingredientsLength > 0 ? softChecks.ingredients = true : softChecks.ingredients = false;
    directionsLength > 0 ? softChecks.directions = true : softChecks.directions = false;
    ingredientsCol.itemIds.length > 0  ? softChecks.ingredientsOrder = true : softChecks.ingredientsOrder = false;
    directionsCol.itemIds.length > 0  ? softChecks.directionsOrder = true : softChecks.directionsOrder = false;

    // console.log('softChecks', softChecks)

    // If all keys in softChecks are true update softComplete state to true
    softChecks.recipeTitle && softChecks.cookTime && softChecks.recipeDescription && softChecks.ingredients && softChecks.directions && softChecks.ingredientsOrder && softChecks.directionsOrder ? setSoftComplete(true) : setSoftComplete(false)

    // console.log('softComplete', softComplete)

  }, [recipeForm, cookTime.length, directions, directionsCol.itemIds.length, ingredients, ingredientsCol.itemIds.length, recipeTitle, recipeDescription.length])

  const formCheck = e => {
    e.preventDefault();
    if (!softComplete) {
      return; 
    }

    // All error statuses are pushed to batch object which is a spread of the newRecipe global state
    let batch = {...recipeForm}

    // Very that each items has required elements
    batch.columns.ingredientsCol.itemIds.map(item => {

      // Verify that each item has something in quantity---------------------------------------------The notes below are for each ingredients quantity value. The logic is practically the same for ingredient name and direction stepText
      if (batch.ingredients[item].quantity.length > 0) {                                                                      // if no error
        const editedIngredient = {...batch.ingredients[item], errors: {...batch.ingredients[item].errors, quantity: false}}   // create a complete ingredient object with spreads, update the [ingredientId].error.quantity value to false
        let i = batch.ingredientErrors.indexOf(item)                                                                          //get index of the ingredientId in the ingredientErrors array
        if (i > -1) {                                                                                                         // if the ingredient id is found in the array
          const editedErrors = batch.ingredientErrors.slice(i, 1);                                                            // create a new ingredientErrors array with ingredientId removed
         batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}, ingredientErrors: editedErrors}    // update batch object with the error free ingredient
        } else {                                                                                                              // if the ingredientId was not found in the array, there is no need for it to get updated
          batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}}                                   // update batch with the updated ingredient object with the error.quantity value === false
        }
      } else {                                                                                                                // if there is an error
        const editedIngredient = {...batch.ingredients[item], errors: {...batch.ingredients[item].errors, quantity: true}}    // create a complete ingredient object with spreads, update the [ingredientId].error.quantity value to true
        if (!batch.ingredientErrors.includes(item)){                                                                          //check if the ingredientsErrors array doesn't contain the ingredientId
          const editedErrors = [...batch.ingredientErrors, item]                                                              // add the ingredientId to the cloned array
          batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}, ingredientErrors: editedErrors}   //update batch with the updated ingredient and ingredientErrors.
        } else {                                                                                                              // if ingredientId is already in the ingredientsArray 
          batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}}                                   // only update the ingredients object, not the ingredientsErrors array
        }
      }

      // Verify that each item has an ingredient
      if (batch.ingredients[item].ingredient.length > 0) {
        const editedIngredient = {...batch.ingredients[item], errors: {...batch.ingredients[item].errors, ingredient: false}}
        let i = batch.ingredientErrors.indexOf(item)
        if (i > -1) {
          const editedErrors = batch.ingredientErrors.slice(i, 1);
          batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}, ingredientErrors: editedErrors}
        } else {
          batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}}
        }
      } else {
        const editedIngredient = {...batch.ingredients[item], errors: {...batch.ingredients[item].errors, ingredient: true}}
        if (!batch.ingredientErrors.includes(item)){
          const editedErrors = [...batch.ingredientErrors, item]
          batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}, ingredientErrors: editedErrors}
        } else {
          batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}}
        }
      }
      console.log(`batch ${item}`, batch)
      console.log(`${item}`, ingredients[item].errors)
      return batch.ingredients[item]
    })

    // Very that each step has required stepText
    batch.columns.directionsCol.itemIds.map(step => {

      // Verify that each step has text in stepText
      if (directions[step].stepText.length > 0) {
        const editedDirection = {...batch.directions[step], errors: {...batch.directions[step].errors, stepText: false}}
        let i = batch.directionErrors.indexOf(step)

        if (i > -1) {
          const editedErrors = directionErrors.slice(i, 1);
         batch = {...batch, directions: {...batch.directions, [step]: editedDirection}, directionErrors: editedErrors}
        } else {
          batch = {...batch, directions: {...batch.directions, [step]: editedDirection}}
        }

      } else {
        const editedDirection = {...batch.directions[step], errors: {...batch.directions[step].errors, stepText: true}}

        if (!directionErrors.includes(step)){
          const editedErrors = [...batch.directionErrors, step]
          batch = {...batch, directions: {...batch.directions, [step]: editedDirection}, directionErrors: editedErrors}
        } else {
          batch = {...batch, directions: {...batch.directions, [step]: editedDirection}}
        }

      }
      console.log(`batch ${step}`, batch)
      console.log('directions', directions[step].errors)
      return batch.directions[step]
    })
    console.log(`batch`, batch)
    // Push batch to newRecipe NOTE: THIS IS A COMPLETE OVERWRITE OF NEW RECIPE
    dispatch(newRecipe(batch))
  }

  return (
    <Box component="form" onSubmit={formCheck}>
      <Box px={{ md: 5, xl: 20 }}>
        <NewRecipeTitle />
        <ConfirmLeavePage completed={false} />
      </Box>
      <Grid container spacing={{ md: 5, xl: 10 }} px={{ md: 5, xl: 20 }} >

        <Grid item xs={12} md={6}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
            <Typography variant="h5" color="primary">Details</Typography>
          </Box>
          <Paper sx={{ p: 2, mt: 2 }}>
            <RecipeTime />
            <ServingSize />
            <PublicSwitch />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <RecipeDescription />
        </Grid>

      </Grid>

      <Grid container spacing={{ md: 5, xl: 10 }} px={{ md: 5, xl: 20 }}>

        <Grid item xs={12} md={6}>
          <IngredientsSection />
        </Grid>

        <Grid item xs={12} md={6}>
          <DirectionsSection />
        </Grid>

      </Grid>
      {softComplete &&
      <>
      <Box sx={{height: "65px"}}></Box>
        <HideOnScroll>
          <AppBar color="backdrop" sx={{ top: 'auto', bottom: 0, }}>
            <Toolbar sx={{left: 0, right: 0, justifyContent: 'center' }}>
              <Button type='submit' variant="contained" color="secondary" endIcon={<SaveIcon />} sx={{ ml: 2 }}>Save this to your kit!</Button>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        </>
      }
    </Box >
  )
}

