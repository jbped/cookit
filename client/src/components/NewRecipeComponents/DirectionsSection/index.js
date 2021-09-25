import React from 'react'
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
import EditableStep from '../EditableStep';

export default function DirectionsSection() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(newRecipe({ [e.target.name]: e.target.value }))
    console.log(recipeForm)
  }

  const directionsDragEnd = () => {

  }
  return (
    <>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'grey.300'
      }}>
        <h2>Directions</h2>
      </Box>
      <EditableStep directions={recipeForm.directions}></EditableStep>
      <Button variant="text"
        sx={{
          textTransform: 'none',
          fontSize: 16,
          fontStyle: 'italic'
        }}>
        <MdLibraryAdd />&nbsp;Add a new step to directions
      </Button>
    </>
  )
}