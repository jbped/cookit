import React from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { editThisRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box,
  Button,
} from '@mui/material';

// Icons....
import {
  BsPeople
} from "react-icons/bs";

// Custom SCSS.... 
import '../../../scss/textfields.scss'

export default function ServingSize() {
  const recipeForm = useSelector(state => state.global.editRecipe)
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(editThisRecipe({ [e.target.name]: e.target.value }))
    // console.log(recipeForm)
  };

  const handleCounter = e => {
    if (e.target.innerText === '+') {
      let count = recipeForm.servings + 1
      dispatch(editThisRecipe({ servings: count }))
    }
    else if (recipeForm.servings > 1) {
      let count = recipeForm.servings - 1
      dispatch(editThisRecipe({ servings: count }))
    }
    // console.log(recipeForm)
  };

  return (
    < Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <BsPeople
        size={25}
        style={{ marginRight: '1rem' }}
      />
      
      <Button
        variant="contained"
        onClick={handleCounter}
        color="secondary"
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          height: '40px',
          minWidth: '30px',
          maxWidth: '30px',
          boxShadow: '2px 0px 2px 0px #00000040',
          fontSize: 22
        }}
      >-</Button>
      <div className="TextField-without-border-radius">
        <TextField
          id="outlined-size-small"
          size="small"
          name="servings"
          value={recipeForm.servings}
          sx={{
            width: 60,
          }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            min: 0,
            style: { textAlign: 'center' },
          }}
          onBlur={handleChange}
        />
      </div>
      <Button
        variant="contained"
        onClick={handleCounter}
        color="secondary"
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: '40px',
          minWidth: '30px',
          maxWidth: '30px',
          boxShadow: '-2px 0px 2px 0px #00000040',
          fontSize: 22,
        }}
      >+</Button>
    </Box >
  )
}