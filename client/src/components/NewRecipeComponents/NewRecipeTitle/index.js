import React, { useState } from 'react'

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box,
  IconButton,
  Typography
} from '@mui/material'

// Icons....
import {
  MdEdit,
  MdSave
} from "react-icons/md";

export default function NewRecipeTitle() {
  const [recipeTitle, setRecipeName] = useState(false)
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();

  const handleChange = e => {
    if (!e.target.value.length) {
      return;
    }
    dispatch(newRecipe({ [e.target.name]: e.target.value }))
    console.log(recipeForm)
  }

  const saveName = (e) => {
    setRecipeName(false)
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      pt: 2,
      borderBottom: 1,
      borderColor: 'divider'
    }
    }>
      {recipeTitle || recipeTitle.length ?
        <>
          <TextField
            id="recipe-name"
            label="Recipe Name"
            name="recipeTitle"
            size="small"
            color="backdrop"
            defaultValue={recipeForm.recipeTitle}
            InputLabelProps={{ shrink: true, color: 'secondary' }}
            sx={{
              margin: '6px 0 5px 0'
            }}
            onBlur={handleChange} />
          <IconButton
            onClick={saveName}
            sx={{
              ml: 2
            }}
          >
            <MdSave
              size={25}

            />
          </IconButton>
        </>
        :
        <>
          <Typography variant="h4" fontWeight="bold" color="primary">{recipeForm.recipeTitle}</Typography>
          <IconButton onClick={() => setRecipeName(true)} >
            <MdEdit
              size={25}
              sx={{
                marginLeft: '2rem'
              }}
            />
          </IconButton>
        </>
      }
    </Box >
  )
}