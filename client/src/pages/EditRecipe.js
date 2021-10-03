import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { editThisRecipe} from '../utils/globalSlice';
import { initialState as initGlobalState } from '../utils/globalSlice'

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
import EditRecipeTitle from '../components/EditRecipeComponents/EditRecipeTitle';
import RecipeTime from '../components/EditRecipeComponents/RecipeTime';
import ServingSize from '../components/EditRecipeComponents/ServingSize';
import PublicSwitch from '../components/EditRecipeComponents/PublicSwitch';
import RecipeDescription from '../components/EditRecipeComponents/RecipeDescription';
import IngredientsSection from '../components/EditRecipeComponents/IngredientsSection';
import DirectionsSection from '../components/EditRecipeComponents/DirectionsSection';

// Queries/Mutations.... 
import { useMutation } from '@apollo/client';
import { EDIT_RECIPE } from '../utils/mutations'

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={'up'} in={!trigger}>
      {children}
    </Slide>
  );
}

export default function EditRecipePage() {
  const recipeForm = useSelector(state => state.global)
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams()
  const recipeId = params.id
  const initRecipeForm = {...recipeForm.editRecipe}
  const [editRecipeMutation] = useMutation(EDIT_RECIPE)
  const [softComplete, setSoftComplete] = useState(false)
  !initRecipeForm.recipeTitle && history.push(`/recipe/${recipeId}`)


  // console.log(recipeForm)
  // console.log(recipeForm)
  
  const { recipeTitle, cookTime, servings, isPublic, recipeDescription, ingredients, directions, columns: { ingredientsCol, directionsCol }, ingredientErrors, directionErrors } = recipeForm?.editRecipe;
  
  // Runs every time recipeForm state updates
  useEffect(() => {

    console.log('edited recipe', recipeForm.editRecipe);

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
    recipeTitle.length >= 2 && recipeTitle !== 'Edit Recipe' ? softChecks.recipeTitle = true : softChecks.recipeTitle = false;
    cookTime.length ? softChecks.cookTime = true : softChecks.cookTime = false;
    recipeDescription.length >= 5 ? softChecks.recipeDescription = true : softChecks.recipeDescription = false;
    ingredientsLength > 0 ? softChecks.ingredients = true : softChecks.ingredients = false;
    directionsLength > 0 ? softChecks.directions = true : softChecks.directions = false;
    ingredientsCol.itemIds.length > 0  ? softChecks.ingredientsOrder = true : softChecks.ingredientsOrder = false;
    directionsCol.itemIds.length > 0  ? softChecks.directionsOrder = true : softChecks.directionsOrder = false;

    // console.log('softChecks', softChecks)

    // If all keys in softChecks are true update softComplete state to true
    softChecks.recipeTitle && softChecks.cookTime && softChecks.recipeDescription && softChecks.ingredients && softChecks.directions && softChecks.ingredientsOrder && softChecks.directionsOrder ? setSoftComplete(true) : setSoftComplete(false);
    (!softChecks.recipeTitle || !softChecks.cookTime || !softChecks.recipeDescription || !softChecks.ingredients || !softChecks.directions || !softChecks.ingredientsOrder || !softChecks.directionsOrder) && dispatch(editThisRecipe({formCleared: false}));

    // console.log('softComplete', softComplete)

  }, [recipeForm.editRecipe]);
  

  const formCheck = e => {
    e.preventDefault();
    if (!softComplete) {
      return; 
    }

    // All error statuses are pushed to batch object which is a spread of the editRecipe global state
    let batch = {...recipeForm.editRecipe}

    // Verify that each item has required elements
    batch.columns.ingredientsCol.itemIds.forEach(item => {

      // Verify that each item has something in quantity---------------------------------------------The notes below are for each ingredients quantity value. The logic is practically the same for ingredient name and direction stepText
      if (batch.ingredients[item].quantity.length > 0) {                                                                      // if no error
        const editedIngredient = {...batch.ingredients[item], errors: {...batch.ingredients[item].errors, quantity: false}}   // create a complete ingredient object with spreads, update the [ingredientId].error.quantity value to false
        if (batch.ingredientErrors.includes(item)) {                                                                          // check if ingredientErrors includes the item if it does
          const editedErrors = ingredientErrors.filter(index => index !== item);                                              // create a new ingredientErrors array with ingredientId filtered out
         batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}, ingredientErrors: editedErrors}    // update batch object with the error free ingredient
        } else {                                                                                                              // if the ingredientId was not found in the array, there is no need for it to get updated
          batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}}                                   // update batch with the updated ingredient object with the error.quantity value === false
        }
      } else {                                                                                                                // if there is an error
        const editedIngredient = {...batch.ingredients[item], errors: {...batch.ingredients[item].errors, quantity: true}}    // create a complete ingredient object with spreads, update the [ingredientId].error.quantity value to true
        if (!batch.ingredientErrors.includes(item)){                                                                          // check if the ingredientsErrors array doesn't contain the ingredientId
          const editedErrors = [...batch.ingredientErrors, item]                                                              // add the ingredientId to the cloned array
          batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}, ingredientErrors: editedErrors}   // update batch with the updated ingredient and ingredientErrors.
        } else {                                                                                                              // if ingredientId is already in the ingredientsArray 
          batch = {...batch, ingredients: {...batch.ingredients, [item]: editedIngredient}}                                   // only update the ingredients object, not the ingredientsErrors array
        }
      }

      // Verify that each item has an ingredient
      if (batch.ingredients[item].ingredient.length > 0) {
        const editedIngredient = {...batch.ingredients[item], errors: {...batch.ingredients[item].errors, ingredient: false}}
        if (batch.ingredientErrors.includes(item)) {
          const editedErrors = ingredientErrors.filter(index => index !== item);
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
      // console.log(`batch ${item}`, batch)
      // console.log(`${item}`, ingredients[item].errors)
    })

    // Very that each step has required stepText
    batch.columns.directionsCol.itemIds.forEach(step => {

      // Verify that each step has text in stepText
      if (directions[step].stepText.length > 0) {
        const editedDirection = {...batch.directions[step], errors: {...batch.directions[step].errors, stepText: false}}
        
        if (batch.directionErrors.includes(step)) { 
          // console.log('directions true')
          const editedErrors = directionErrors.filter(index => index !== step);
          // console.log(editedErrors)
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
      // console.log(`batch ${step}`, batch)
      // console.log('directions', directions[step].errors)
    })
    // console.log(`batch`, batch)
    // Push batch to editThisRecipe NOTE: THIS IS A COMPLETE OVERWRITE OF EDIT RECIPE    
    dispatchHandler(batch)
  }
  
  const dispatchHandler = batch => {
    dispatch(editThisRecipe(batch))
    // console.log('recipeForm', recipeForm)
    console.log('ingredientErrors.length: ', batch.ingredientErrors.length, '\ndirectionErrors.length: ', batch.directionErrors.length)

    if(batch.ingredientErrors.length !== 0 || batch.directionErrors.length !== 0) {
      console.log('Errors found, cannot edit recipe')
      return;
    } else {
      // console.log('editRecipe')
      dispatch(editThisRecipe({formCleared: true}))
      editRecipe()
    }

  }

  const editRecipe = async () => {
    let editRecipeObj = {
      recipeTitle,
      cookTime,
      servings, 
      recipeDescription,
      ingredientsOrder: ingredientsCol.itemIds,
      directionsOrder: directionsCol.itemIds,
    }
    // console.log('editRecipeObj', editRecipeObj)

    let ingredientsArr = []
    let directionsArr = []

    let publicBool = isPublic === 'private' ? false : true
    editRecipeObj.isPublic = publicBool

    await ingredientsCol.itemIds.forEach(item => {
      let trimmedIngredient = {
        ingredientId: ingredients[item].ingredientId,
        quantity: ingredients[item].quantity,
        measurement: ingredients[item].measurementTypeShort,
        ingredientName: ingredients[item].ingredient,
        preparationNotes: ingredients[item].notes,
      }
      ingredientsArr.push(trimmedIngredient);
    });
    editRecipeObj.ingredients = ingredientsArr

    await directionsCol.itemIds.forEach(item => {
      let trimmedStep = {
        stepId: directions[item].stepId,
        stepText: directions[item].stepText,
      }
      directionsArr.push(trimmedStep);
    })
    editRecipeObj.directions = directionsArr
    // console.log('recipe edited', formCleared)

    
    try{
      const { data } = await editRecipeMutation({
        variables: {
          recipeId,
          ...editRecipeObj
        }
      });

      // console.log(data.editRecipe._id)
      data && dispatch(editThisRecipe(initGlobalState.editRecipe))
      history.push(`/recipe/${data.editRecipe._id}`)
    } catch (e) {
      console.error('Edit Recipe Error: ', e)
    }
  }
  
// Convert ingredients array to an object organized by the ingredientsOrder
// ingredientsOrder.forEach(id => {
//   ingredients.filter(ingredient => {
//     if (ingredient.ingredientId === id) {
//       ingredientsObject[ingredient.ingredientId] = {...ingredient}
//       return ingredientsObject;
//     }
//     return ingredientsObject;
//   })
// });
// console.log('ingredientsObject', ingredientsObject)

//   // Convert directions array to an object organized by the directionsOrder
//   const directionsObject = {}
//   directionsOrder.forEach(id => {
//     directions.filter(direction => {
//       if (direction.stepId === id) {
//         directionsObject[direction.stepId] = {...direction}
//         return directionsObject;
//       }
//       return directionsObject;
//     })
//   });

  return (
    <Box component="form" onSubmit={formCheck}>
      <Box px={{ md: 5, xl: 20 }}>
        <EditRecipeTitle />
        {initRecipeForm.recipeName &&
        <ConfirmLeavePage />}
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
              <Button type='submit' variant="contained" color="secondary" endIcon={<SaveIcon />} sx={{ ml: 2 }}>Save all changes!</Button>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        </>
      }
    </Box >
  )
}


