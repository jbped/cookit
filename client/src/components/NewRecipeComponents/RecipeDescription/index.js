import React from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box,
} from '@mui/material'

export default function RecipeDescription() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(newRecipe({ [e.target.name]: e.target.value }))
    console.log(recipeForm)
  }

  return (
    <>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'grey.300'
      }}>
        <h2>Description</h2>
      </Box >
      <TextField
        id="outlined-size-small"
        size="small"
        label="Description"
        name="description"
        type="text"
        multiline
        defaultValue={recipeForm.description}
        sx={{
          mt: 2,
          width: '100%',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          flexGrow: '1'
        }}
        fullWidth
        InputLabelProps={{ shrink: true }}
        onBlur={handleChange}
      />
    </>
  )
}