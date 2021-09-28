import React from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
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
import { AiOutlineEye } from "react-icons/ai";

export default function PublicSwitch() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(newRecipe({ [e.target.name]: e.target.value }))
    console.log(recipeForm)
  };

  const publicPopState = usePopupState({
    variant: 'popover',
    popupId: 'publicPopover',
  });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <AiOutlineEye
        size={25} style={{ marginRight: '1rem' }}
        {...bindTrigger(publicPopState)}
        {...bindHover(publicPopState)}
      />
      <HoverPopover
        {...bindPopover(publicPopState)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box>
          <p sx={{ margin: "2px 5px" }}>Would you like to make this recipe visible to other CooKit users?</p>
        </Box>
      </HoverPopover>
      <ToggleButtonGroup
        color="primary"
        name="isPublic"
        value={recipeForm.isPublic}
        exclusive
        onChange={handleChange}
        color="secondary"
        sx={{
          flexGrow: 1,
          display: 'flex',
          height: '40px'
        }}
      >
        <ToggleButton value="private" name="isPublic" sx={{ flexGrow: 1 }}>Private</ToggleButton>
        <ToggleButton value="public" name="isPublic" sx={{ flexGrow: 1 }}>Public</ToggleButton>
      </ToggleButtonGroup>
    </Box >
  )
}