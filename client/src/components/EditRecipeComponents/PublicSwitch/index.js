import React from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { editThisRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'

// Icons....
import { AiOutlineEye } from "react-icons/ai";

export default function PublicSwitch() {
  const recipeForm = useSelector(state => state.global.editRecipe)
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(editThisRecipe({ [e.target.name]: e.target.value }))
    // console.log(recipeForm)
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <AiOutlineEye
        size={25} style={{ marginRight: '1rem' }}
      />
      
      <ToggleButtonGroup
        color="primary"
        name="isPublic"
        value={recipeForm.isPublic}
        exclusive
        onChange={handleChange}
        
        sx={{
          flexGrow: 1,
          display: 'flex',
          height: '40px'
        }}
      >
        <ToggleButton value="private" name="isPublic" color="secondary" sx={{ flexGrow: 1 }}>Private</ToggleButton>
        <ToggleButton value="public" name="isPublic" color="secondary" sx={{ flexGrow: 1 }}>Public</ToggleButton>
      </ToggleButtonGroup>
    </Box >
  )
}