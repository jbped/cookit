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

export default function EditableIngredient(props) {

  const measurementTypes = [
    {
      type: '-------------',
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
      type: 'fluid ounces',
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
  return (
   <Box sx={{
     mt:2,
     width:'100%',
     height: '200px',
     border: 1,
     borderRadius: '4px',
     borderColor: 'grey.300'
   }}>
     
   </Box>
  )
}