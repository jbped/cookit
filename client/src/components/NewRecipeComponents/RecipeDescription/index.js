import React from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box,
  Typography,
  Paper,
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
        mt: 3,
        borderBottom: 1,
        borderColor: 'divider'

      }}>
        <Typography variant="h5" color="primary">Description</Typography>
      </Box >
      <Paper sx={{p: 2, boxShadow: 4, mt: 2 }}>
        <TextField
          id="outlined-size-small"
          size="small"
          label="Description"
          name="recipeDescription"
          type="text"
          multiline
          defaultValue={recipeForm.recipeDescription}
          sx={{
            width: '100%',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            flexGrow: '1'
          }}
          fullWidth
          color="backdrop"
          InputLabelProps={{ shrink: true, color: 'secondary' }}
          onBlur={handleChange}
        />
      </Paper>
    </>
  )
}