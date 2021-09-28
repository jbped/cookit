import React from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box,
  Button,
} from '@mui/material';

// Other Components/Hooks.... 
import {
  usePopupState,
  bindPopover,
  bindTrigger,
  bindHover,
} from 'material-ui-popup-state/hooks'
import HoverPopover from 'material-ui-popup-state/HoverPopover';

// Icons....
import {
  BsPeople
} from "react-icons/bs";

// Custom SCSS.... 
import '../../../scss/textfields.scss'

export default function ServingSize() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(newRecipe({ [e.target.name]: e.target.value }))
    console.log(recipeForm)
  };

  const handleCounter = e => {
    if (e.target.innerText === '+') {
      let count = recipeForm.servings + 1
      dispatch(newRecipe({ servings: count }))
    }
    else if (recipeForm.servings > 1) {
      let count = recipeForm.servings - 1
      dispatch(newRecipe({ servings: count }))
    }
    console.log(recipeForm)
  };

  const servingPopState = usePopupState({
    variant: 'popover',
    popupId: 'servingsPopover',
  });

  return (
    < Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <BsPeople
        size={25}
        style={{ marginRight: '1rem' }}
        {...bindTrigger(servingPopState)}
        {...bindHover(servingPopState)} />
      <HoverPopover color="backdrop"
        {...bindPopover(servingPopState)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box color="backdrop">
          <p sx={{ margin: "2px 5px" }}>Servings</p>
        </Box>
      </HoverPopover>

      <Button
        variant="contained"
        onClick={handleCounter}
        color="secondary"
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          height: '40px',
          minWidth: '30px',
          maxWidth: '30px',
          boxShadow: '2px 0px 2px 0px #00000040',
          fontSize: 22
        }}
      >-</Button>
      <div className="TextField-without-border-radius">
        <TextField
          id="outlined-size-small"
          size="small"
          name="servings"
          value={recipeForm.servings}
          sx={{
            width: 60,
          }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            min: 0,
            style: { textAlign: 'center' },
          }}
          onBlur={handleChange}
        />
      </div>
      <Button
        variant="contained"
        onClick={handleCounter}
        color="secondary"
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: '40px',
          minWidth: '30px',
          maxWidth: '30px',
          boxShadow: '-2px 0px 2px 0px #00000040',
          fontSize: 22,
        }}
      >+</Button>
    </Box >
  )
}