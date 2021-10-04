import React, { useState } from 'react'

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { editThisRecipe } from '../../../utils/globalSlice';
import { toggleDeleteDialog } from '../../../utils/globalSlice'

// MUI Components....
import {
  TextField,
  Box,
  IconButton,
  Typography
} from '@mui/material'

// Other Components.... 
import DeleteDialog from '../DeleteDialog'

// Icons....
import {
  MdEdit,
  MdSave
} from "react-icons/md";
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditRecipeTitle() {
  const [recipeTitle, setRecipeName] = useState(false);
  const recipeForm = useSelector(state => state.global.editRecipe);
  const dispatch = useDispatch();

  const handleChange = e => {
    if (!e.target.value.length) {
      return;
    }
    dispatch(editThisRecipe({ [e.target.name]: e.target.value }))
    // console.log(recipeForm)
  }

  const saveName = (e) => {
    setRecipeName(false)
  }

  const handleDeleteDialog = () => {
    dispatch(toggleDeleteDialog())
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      pt: 2,
      borderBottom: 1,
      borderColor: 'divider'
    }
    }>
      <DeleteDialog />
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
          <Box marginLeft={{ xs: 0, sm: 'auto' }} sx={{
                  // marginLeft: '1rem',
                  mb:1,
                  borderRight: 1,
                  borderColor: 'divider',
                  paddingRight: '.5rem'
                }}>
            <IconButton onClick={() => setRecipeName(true)} >
              <MdEdit
                size={25}
              />
            </IconButton>
          </Box>
          <Box ml='.5rem' mb={1}>
            <IconButton onClick={handleDeleteDialog} >
              <DeleteIcon
                size={25}
              />
            </IconButton>
          </Box>
        </>
      }
    </Box >
  )
}