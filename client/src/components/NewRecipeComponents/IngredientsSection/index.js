import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  Box,
  Button,
} from '@mui/material'


// Icons....
import {
  MdLibraryAdd
} from "react-icons/md";

// Custom Components.... 
import EditableIngredient from '../EditableIngredient';

// Custom SCSS.... 
import '../../../scss/textfields.scss'

export default function IngredientsSection() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(newRecipe({ [e.target.name]: e.target.value }))
    console.log(recipeForm)
  }

  const ingredientDragEnd = () => {

  }
  return (
    <>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'grey.300'
      }}>
        <h2>Ingredients</h2>
      </Box>
      <DragDropContext
        // onDragUpdate
        // onDragUpdate
        onDragEnd={ingredientDragEnd}
      >

      </DragDropContext>
      <EditableIngredient ingredients={recipeForm.ingredients}></EditableIngredient>
      <Button variant="text"
        sx={{
          textTransform: 'none',
          fontSize: 16,
          fontWeight: 'lighter',
          fontStyle: 'italic',
          color: 'primary'
        }}>
        <MdLibraryAdd />&nbsp;Add a new ingredient
      </Button>
    </>
  )
}