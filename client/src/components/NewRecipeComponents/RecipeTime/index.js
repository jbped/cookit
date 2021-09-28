import React from 'react'

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box,
  MenuItem,
} from '@mui/material'

// Other Components/Hooks.... 
import {
  usePopupState,
  bindPopover,
  bindTrigger,
  bindHover,
} from 'material-ui-popup-state/hooks'
import HoverPopover from 'material-ui-popup-state/HoverPopover'

// Icons....
import {
  MdAccessAlarm,
} from "react-icons/md";

export default function RecipeTime() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();

  const timeOptions = [
    '10 minutes',
    '20 minutes',
    '30 minutes',
    '40 minutes',
    '50 minutes',
    '1 hour',
    '1 hour 15 minutes',
    '1 hour 30 minutes',
    '1 hour 45 minutes',
    '2 hours',
    '2 hours 15 minutes',
    '2 hours 30 minutes',
    '2 hours 45 minutes',
    '3 hours',
    '3 hours 30 minutes',
    '4 hours',
    '4 hours 30 minutes',
    '5 hours',
    '5 hours 30 minutes',
    '6 hours',
    '6 hours 30 minutes',
    '7 hours',
    '7 hours 30 minutes',
    '8 hours',
    '8 hours 30 minutes',
    '9 hours',
    '9 hours 30 minutes',
    '10 hours',
    '10 hours 30 minutes',
    '11 hours',
    '11 hours 30 minutes',
    '12 hours',
    '13 hours',
    '14 hours',
    '15 hours',
    '16 hours',
    '17 hours',
    '18 hours',
    '19 hours',
    '20 hours',
    '21 hours',
    '22 hours',
    '23 hours',
    '24 hours',
    '>24 hours',
  ]

  const handleChange = e => {
    dispatch(newRecipe({ [e.target.name]: e.target.value }))
    console.log(recipeForm)
  }

  const timePopState = usePopupState({
    variant: 'popover',
    popupId: 'timePopover',
  });

  return (
    < Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <MdAccessAlarm
        size={25}
        style={{ marginRight: '1rem' }}
        {...bindTrigger(timePopState)}
        {...bindHover(timePopState)}
      />
      <HoverPopover
        {...bindPopover(timePopState)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div>
          <p sx={{ margin: "2px 5px" }}>Total time to prepare, cook, and serve</p>
        </div>
      </HoverPopover>
      <TextField
        id="time-to-serve"
        name="cookTime"
        select
        size="small"
        placeholder="Total Time"
        value={recipeForm.cookTime}
        onChange={handleChange}
        sx={{
          flexGrow: 1
        }}
      >
        {timeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box >
  )
}