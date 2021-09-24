import React, { useState, useEffect } from 'react';

// MUI Components....
import {
  TextField,
  Box,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from '@mui/material'

// Custom SCSS.... 
import '../../scss/textfields.scss'

export default function EditableIngredient(props) {
  const [ingredientState, setIngredientState] = useState({
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
      width: '100%',
      height: '200px',
      border: 1,
      borderRadius: '4px',
      borderColor: 'grey.300'
    }}>
      <Box sx={{
        display: 'flex',
        mt: 2,
        ml: 2,
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
        <div className="TextField-no-border-left" style={{marginLeft: '-1px'}}>
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
    </Box>
  )
}