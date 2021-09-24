import React, { useState } from 'react'

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box,
  IconButton
} from '@mui/material'

// Icons....
import {
  MdEdit,
  MdSave
} from "react-icons/md";

export default function NewRecipeTitle() {
  const [recipeName, setRecipeName] = useState(false)
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
    <Box Box sx={{
      display: 'flex',
      alignItems: 'center',
      marginTop: '.4rem',
      borderBottom: 1,
      borderColor: 'grey.300'
    }
    }>
      {recipeName || recipeName.length ?
        <>
          <TextField
            id="recipe-name"
            label="Recipe Name"
            name="recipeName"
            size="small"
            defaultValue={recipeForm.recipeName}
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
          <h2>{recipeForm.recipeName}</h2>
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