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
      let count = recipeForm.partySize + 1
      dispatch(newRecipe({ partySize: count }))
    }
    else if (recipeForm.partySize > 1) {
      let count = recipeForm.partySize - 1
      dispatch(newRecipe({ partySize: count }))
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
      <HoverPopover
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
        <div>
          <p sx={{ margin: "2px 5px" }}>Servings</p>
        </div>
      </HoverPopover>

      <Button
        variant="contained"
        onClick={handleCounter}
        color="grey"
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
          name="partySize"
          value={recipeForm.partySize}
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
        color="grey"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: '40px',
          minWidth: '30px',
          maxWidth: '30px',
          boxShadow: '-2px 0px 2px 0px #00000040',
          fontSize: 22
        }}
      >+</Button>
    </Box >
  )
}