import React from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { currentRecipe } from '../utils/globalSlice';

// MUI Components....
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
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
  MdEdit,
  MdSave,
  MdAccessAlarm,
} from "react-icons/md";

import {
  BsPeople
} from "react-icons/bs";

export default function ViewRecipe() {
  const receivedData = {
    _id: "614fe7e963526de392b539b5",
    isPublic: true,
    creator: "BoDee_Angus",
    createdAt: "09/25/2021 at 9:24 PM",
    recipeTitle: "Fried Eggs",
    recipeDescription: "Eggs fried in a pan filled with butter, salted and peppered to perfection.",
    type: "Dinner",
    season: "All",
    difficulty: 1,
    servings: 6,
    cookTime: "1 hour",
    directions: [
      {
        stepId: "step-1",
        stepText: "First, melt butter on pan at medium heat.",
      },
      {
        stepId: "step-2",
        stepText: "Then, crack eggs onto pan gently.",
      },
      {
        stepId: "step-3",
        stepText: "Salt and pepper the eggs, and then wait until the edges solidify completely.",
      },
      {
        stepId: "step-4",
        stepText: "Flip eggs over, and let sit for a minute or two. After take off heat and serve.",
      }
    ],
    directionsOrder: ["step-1", "step-2", "step-3", "step-4"],
    ingredients: [
      {
        ingredientId: "ingredient-1",
        measurement: null,
        ingredientName: "Egg",
        quantity: 2,
        preparationNotes: "large"
      },
      {
        ingredientId: "ingredient-2",
        measurement: "Tbsp",
        ingredientName: "Butter",
        quantity: 2,
        preparationNotes: "Salted"
      }
    ],
    ingredientsOrder: ["ingredient-1", "ingredient-2"],
    comments: [
      {
        _id: "614fe7f963526de392b539d0",
        commentText: "Wow this was delicious!",
        username: "BoDee_Angus",
        upvotes: [
          {
            _id: "614feb27c6da2f76bdc176f2",
            username: null
          }
        ]
      }
    ],
    upvotes: [
      {
        _id: "614feb21c6da2f76bdc176ee",
        username: "BoDee_Angus"
      }
    ]
  }

  // Destructuring of 
  const { recipeTitle, isPublic, creator, createdAt, recipeDescription, servings, cookTime, directions, directionsOrder, ingredients, ingredientsOrder } = receivedData

  // Splits the createdAt string into to indexes DD/MM/YYYY and time
  const editedDateArr = createdAt.split(' at ');

  // Convert ingredients array to an object organized by the ingredientsOrder
  const ingredientsObject = {}
  ingredientsOrder.map(id => {
    ingredients.filter(ingredient => {
      if (ingredient.ingredientId === id) {
        ingredientsObject.ingredientId = {...ingredient}
        return;
      }
    })
  });

  // Convert directions array to an object organized by the directionsOrder
  const directionsObject = {}
  directionsOrder.forEach(id => {
    directions.filter(direction => {
      console.log(direction)
      if (direction.directionId === id) {
        directionsObject.directionId = {...direction}
      }
    })
  });

  const editRecipe = () => {

  }

  // state for the time hover popover effect
  const timePopState = usePopupState({
    variant: 'popover',
    popupId: 'timePopover',
  });

  // state for the servings hover popover effect
  const servingPopState = usePopupState({
    variant: 'popover',
    popupId: 'servingsPopover',
  });

  const rows = {}

  return (
    <Box>
      {/* Recipe Title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center',
          marginTop: '.4rem',
          borderBottom: 1,
          borderColor: 'grey.300',
        }}>
        <Box sx={{ display: "flex", alignItems: 'center', }}>
          <Typography variant="h5">{recipeTitle}</Typography>
          {isPublic ?
            <Typography variant="subtitle1" fontStyle="italic">&nbsp;- Public</Typography>
            :
            <Typography variant="subtitle1" fontStyle="italic">&nbsp;- Private</Typography>}
        </Box>
        {/* EDIT AND EASY QUICK BUTTONS */}
        <IconButton onClick={editRecipe} >
          <MdEdit
            size={25}
            sx={{
              marginLeft: '2rem'
            }}
          />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: "center" }}>
        <Typography variant='body2'>By: {creator} - {editedDateArr[0][0] === '0' ? editedDateArr[0].slice(1) : editedDateArr[0]}</Typography>

      </Box>

      <Grid container spacing={{ md: 5, lg: 10 }}>

        <Grid item xs={12} md={6}>
          <Box sx={{
            borderBottom: 1,
            borderColor: 'grey.300'
          }}>
            <h2>Details</h2>
          </Box >
          {/* TIME */}
          <Box sx={{ mt: 2, display: 'flex', alignItems: "center" }}>
            <MdAccessAlarm
              size={25}
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
            <Typography sx={{ ml: 1 }}>{cookTime}</Typography>
          </Box>
          {/* SERVING SIZE */}
          <Box sx={{ mt: 2, display: 'flex', alignItems: "center" }}>
            <BsPeople
              size={25}
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
            <Typography sx={{ ml: 1 }}>{servings} {servings === 1 ? 'person' : 'people'}</Typography>
          </Box>
          {/* Description */}
          <Box sx={{
            borderBottom: 1,
            borderColor: 'grey.300'
          }}>
            <h2>Description</h2>
          </Box >
          <Typography>{recipeDescription}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Ingredients */}
          <Box sx={{
            borderBottom: 1,
            borderColor: 'grey.300'
          }}>
            <h2>Ingredients</h2>
          </Box >
          {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
        </Grid>

      </Grid>

      <Grid container spacing={{ md: 5, lg: 10 }}>

        <Grid item xs={12} md={6}>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Directions */}
        </Grid>

      </Grid>
    </Box>
  )
}