import React, { useState, useEffect } from 'react'

// MUI Components....
import {
  TextField,
  Box,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from '@mui/material'

// Other Components/Hooks.... 
import {
  usePopupState,
  bindTrigger,
  bindPopover,
  bindHover,
} from 'material-ui-popup-state/hooks'
import HoverPopover from 'material-ui-popup-state/HoverPopover'

// Icons....
import {
  MdEdit,
  MdSave,
  MdAccessAlarm,
} from "react-icons/md";

// Custom Components.... 
import EditableIngredient from '../components/EditableIngredient';

// Custom SCSS.... 
import '../scss/textfields.scss'

import {
  BsPeople
} from "react-icons/bs";

import { AiOutlineEye } from "react-icons/ai";

export default function NewRecipe() {
  const [recipeName, setRecipeName] = useState(false)
  const [recipeForm, setRecipeForm] = useState({
    recipeName: 'New Recipe',
    type: [],
    time: '',
    partySize: 1,
    public: 'private',
    ingredients: [],
    directions: []
  });

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

  const saveName = (e) => {
    setRecipeName(false)
  }

  const handleCounter = e => {
    // console.log(e.target)
    if (e.target.innerText === '+') {
      let count = recipeForm.partySize + 1
      setRecipeForm({ ...recipeForm, partySize: count })
    } else if (recipeForm.partySize > 1) {
      let count = recipeForm.partySize - 1
      setRecipeForm({ ...recipeForm, partySize: count })
    }
  }

  const handleChange = e => {
    // console.log(e)
    if (e.target.name === 'recipeName' && !e.target.value.length) {
      return;
    }
    // console.log(e.target)
    setRecipeForm({ ...recipeForm, [e.target.name]: e.target.value })
    // console.log(recipeForm)
  }

  const timePopState = usePopupState({
    variant: 'popover',
    popupId: 'timePopover',
  })

  const servingPopState = usePopupState({
    variant: 'popover',
    popupId: 'servingsPopover',
  })

  const publicPopState = usePopupState({
    variant: 'popover',
    popupId: 'publicPopover',
  })

  return (
    <Box
      component="form"
    >
      {/* Recipe Name Text box */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '.4rem',
        borderBottom: 1,
        borderColor: 'grey.300'
      }}>
        {recipeName || recipeName.length ?
          <>
            <TextField id="recipe-name" label="Recipe Name" name="recipeName" size="small" style={{ margin: '6px 0 5px 0' }} onBlur={handleChange} />
            <MdSave size={25} style={{ marginLeft: '2rem' }} onClick={saveName} />
          </>
          :
          <>
            <h2>{recipeForm.recipeName}</h2>
            <MdEdit size={25} style={{ marginLeft: '2rem' }} onClick={() => setRecipeName(true)} />
          </>
        }
      </Box>

      {/* Recipe Total Time Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
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
          name="time"
          select
          size="small"
          placeholder="Total Time"
          value={recipeForm.time}
          onChange={handleChange}
          sx={{
            width: 220,
          }}
        >
          {timeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Recipe Serving Size */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
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
            defaultValue={recipeForm.partySize}
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
      </Box>
      {/* Public Recipe Toggle */}
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
          <div>
            <p sx={{ margin: "2px 5px" }}>Would you like to make this recipe visible to other CooKit users?</p>
          </div>
        </HoverPopover>
        <ToggleButtonGroup
          color="primary"
          name="public"
          value={recipeForm.public}
          exclusive
          onChange={handleChange}
          sx={{
            flexGrow: 1,
            display: 'flex',
            height: '40px'
          }}
        >
          <ToggleButton value="private" name="public" sx={{ flexGrow: 1 }}>Private</ToggleButton>
          <ToggleButton value="public" name="public" sx={{ flexGrow: 1 }}>Public</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Ingredients Title */}
      <Box sx={{
        borderBottom: 1,
        borderColor: 'grey.300'
      }}>
        <h2>Ingredients</h2>
      </Box>
      <EditableIngredient></EditableIngredient>
    </Box>
  )
}

