import React, { useState } from 'react';

// MUI Components....
import {
  TextField,
  Box
} from '@mui/material'

export default function EditableIngredient(props) {
  const [stepState, setStepState] = useState('')

  const handleChange = e => {
    setStepState(e.target.value)
    console.log(stepState)
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
      <TextField
        id="outlined-size-small"
        size="small"
        label="Step"
        name="step"
        type="text"
        multiline
        defaultValue={stepState}
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