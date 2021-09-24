import React, { useState } from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box,
  MenuItem,
} from '@mui/material'

// Custom SCSS.... 
import '../../../scss/textfields.scss'

export default function EditableIngredient(props) {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();
  
  const [ingredientState, setIngredientState] = useState({
    id: '',
    quantity: '',
    measurementType: '',
    measurementTypeShort: '',
    ingredient: '',
    notes: ''
  })

  const { quantity, measurementType, measurementTypeShort, ingredient, notes } = ingredientState

  const measurementTypes = [
    {
      type: 'Not applicable',
      short: 'n/a'
    },
    {
      type: 'teaspoon(s)',
      short: 'tsp'
    },
    {
      type: 'tablespoon(s)',
      short: 'Tbsp'
    },
    {
      type: 'cup(s)',
      short: 'c'
    },
    {
      type: 'ounces(s)',
      short: 'oz'
    },
    {
      type: 'pound(s)',
      short: 'lbs'
    },
    {
      type: 'gram(s)',
      short: 'g'
    },
    {
      type: 'kilogram(s)',
      short: 'kg'
    },
    {
      type: 'fluid ounce(s)',
      short: 'fl oz'
    },
    {
      type: 'pint(s)',
      short: 'pt'
    },
    {
      type: 'quart(s)',
      short: 'qt'
    },
    {
      type: 'gallon(s)',
      short: 'gal'
    },
    {
      type: 'milliliter(s)',
      short: 'mL'
    },
    {
      type: 'liter(s)',
      short: 'L'
    },

  ]

  const handleChange = e => {
    if (e.target.name === 'measurementType') {
      let { type, short } = measurementTypes.find(measurement => measurement.short === e.target.value)
      setIngredientState({ ...ingredientState, measurementType: type, measurementTypeShort: short });
      console.log(type, short)
    } else {
      setIngredientState({ ...ingredientState, [e.target.name]: e.target.value })
    }
    console.log(ingredientState)
  }

  return (
    <Box sx={{
      mt: 2,
      py: 2, 
      width: '100%',
      border: 1,
      borderRadius: '4px',
      borderColor: 'grey.300'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mx:2,
      }}>
        <div className="TextField-no-border-right">
          <TextField
            id="outlined-size-small"
            size="small"
            label="Quantity"
            name="quantity"
            type="text"
            defaultValue={quantity}
            sx={{
              width: 100,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              flexGrow: '1'
            }}
            InputLabelProps={{ shrink: true }}
            onBlur={handleChange}
          />
        </div>
        <div className="TextField-no-border-left" style={{ marginLeft: '-1px' }}>
          <TextField
            id="outlined-size-small"
            size="small"
            select
            label="Type"
            name="measurementType"
            value={measurementTypeShort}
            InputLabelProps={{ shrink: true }}
            SelectProps={{ renderValue: option => option }}
            sx={{
              width: 80,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onChange={handleChange}
          >
            {measurementTypes.map(option => (
              <MenuItem key={option.short} value={option.short}>
                {option.type} - {option.short}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
      <Box
      sx={{
        mt: 2,
        mx: 2,
      }}>
      <TextField
        id="outlined-size-small"
        size="small"
        label="Ingredient"
        name="ingredient"
        type="text"
        defaultValue={quantity}
        sx={{
          width: '100%',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          flexGrow: '1'
        }}
        fullWidth
        InputLabelProps={{ shrink: true }}
        onBlur={handleChange}
      />
      </Box>
      <Box
      sx={{
        mt: 2,
        mx: 2,
      }}>
      <TextField
        id="outlined-size-small"
        size="small"
        label="Notes"
        name="notes"
        type="text"
        multiline
        defaultValue={notes}
        sx={{
          width: '100%',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          flexGrow: '1'
        }}
        fullWidth
        InputLabelProps={{ shrink: true }}
        onBlur={handleChange}
      />
      </Box>
    </Box>
  )
}