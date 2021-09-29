import React, { useState, useEffect } from 'react';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { setEasyCookStep, toggleEasyCookView } from '../utils/globalSlice';

// MUI Components....
import {
  Box,
  Grid,
  Button,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  MobileStepper
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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import {
  BsPeople
} from "react-icons/bs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewRecipe() {
  const easyCookStep = useSelector(state => state.global.easyCookStep);
  const easyCookView = useSelector(state => state.global.easyCookView);
  const dispatch = useDispatch();

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
        ingredientName: "Eggs",
        quantity: "2",
        preparationNotes: "large"
      },
      {
        ingredientId: "ingredient-2",
        measurement: "Tbsp",
        ingredientName: "Butter",
        quantity: "2",
        preparationNotes: "Salted"
      },
      {
        ingredientId: "ingredient-3",
        measurement: "c",
        ingredientName: "Sour Cream",
        quantity: "1/2",
        preparationNotes: ""
      }
    ],
    ingredientsOrder: ["ingredient-1", "ingredient-3", "ingredient-2"],
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

  // Destructuring of the keys in the recipe object received from the database
  const { recipeTitle, isPublic, creator, createdAt, recipeDescription, servings, cookTime, directions, directionsOrder, ingredients, ingredientsOrder } = receivedData

  // Splits the createdAt string into to indexes DD/MM/YYYY and time
  const editedDateArr = createdAt.split(' at ');

  // Create new array of ingredients that is ordered appropriately by the ingredientsOrder
  const orderedIngredients = [];
  ingredientsOrder.forEach(id => {
    ingredients.filter(ingredient => {
      if (ingredient.ingredientId === id) {

        // Base ingredient information 'quantitymeasurement ingredientName' or 'quantity ingredientNate'
        const quantityText = `${ingredient.quantity} ${(ingredient.measurement && !ingredient.measurement !== 'n/a') ? ingredient.measurement : ''} ${ingredient.ingredientName}`
        // Preparation notes 'preparationNotes' or ''
        const prepNotesText = ingredient.preparationNotes ? `${ingredient.preparationNotes}` : ''
        orderedIngredients.push({ ...ingredient, quantityText, prepNotesText })
        return orderedIngredients;
      }
      return orderedIngredients;
    })
  })


  // Convert directions array to an object organized by the directionsOrder
  const orderedDirections = []
  directionsOrder.forEach(id => {
    directions.filter(direction => {
      if (direction.stepId === id) {
        orderedDirections.push({ ...direction })
        return orderedDirections;
      }
      return orderedDirections;
    })
  });

  const mid = Math.ceil(orderedIngredients.length / 2)
  const col1 = orderedIngredients.slice(0, mid)
  const col2 = orderedIngredients.slice(mid, orderedIngredients.length)

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

  const editRecipe = () => {

  }

  // Function called when a step button is pressed. Opens easy view to that desired step
  const openStep = e => {
    const selectedStep = e.target.dataset.stepIndex
    dispatch(setEasyCookStep(selectedStep))
    dispatch(toggleEasyCookView())
  }

  // Toggled easy view open or closed
  const toggleEasyView = e => {
    dispatch(toggleEasyCookView())
  }

  // Progresses Easy View to next step
  const handleNext = () => {
    dispatch(setEasyCookStep(easyCookStep + 1));
  };
  // Regresses Easy View to previous step
  const handleBack = () => {
    dispatch(setEasyCookStep(easyCookStep - 1));
  };

  return (
    <Box>
      {/* Recipe Title */}
      <Box
        mx={{ xs: 0, md: 5, xl: 20 }}
        sx={{
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center',
          marginTop: '.4rem',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >

        <Box sx={{ display: "flex", alignItems: 'center', }}>
          <Typography variant="h4" fontWeight="bold" color="primary">{recipeTitle}</Typography>
          <Typography variant="subtitle1" fontStyle="italic" color="secondary">&nbsp;
            {isPublic ?
              '- Public'
              :
              '- Private'
            }
          </Typography>
        </Box>

        {/* EDIT BUTTONS */}
        <IconButton onClick={editRecipe} >
          <MdEdit
            size={25}
            sx={{
              marginLeft: '2rem'
            }}
          />
        </IconButton>

      </Box>

      <Box ml={{ xs: 0, md: 5, xl: 20 }} sx={{ display: 'flex', alignItems: "center", }}>
        <Typography variant='subtitle1'>
          By: {creator} - {editedDateArr[0][0] === '0' ? editedDateArr[0].slice(1) : editedDateArr[0]}
        </Typography>
      </Box>

      <Grid container spacing={{ md: 5, lg: 10 }} px={{ md: 5, xl: 20 }}>
        <Grid item xs={12} md={6}>

          <Box
            sx={{
              mt: 2,
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
            <Typography variant="h5" color="primary">Details</Typography>
          </Box >
          <Paper
            sx={{
              p: 2,
              mt: 2,
              border: 1,
              borderRadius: 1,
              boxShadow: 4,
              borderColor: 'backdrop.dark',
            }}
          >

            {/* TIME */}
            <Box sx={{ display: 'flex', alignItems: "center" }}>
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

              <Typography sx={{ ml: 1 }}>
                {cookTime}
              </Typography>
            </Box>

            {/* SERVING SIZE */}
            <Box sx={{ mt: 2, display: 'flex', alignItems: "center" }}>
              <BsPeople
                size={25}
                {...bindTrigger(servingPopState)}
                {...bindHover(servingPopState)}
              />

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

              <Typography sx={{ ml: 1 }}>
                {servings} {servings === 1 ? 'person' : 'people'}
              </Typography>

            </Box>

          </Paper>

        </Grid>


        <Grid item xs={12} md={6}>
          {/* Description */}
          <Box sx={{
            mt: 2,
            borderBottom: 1,
            borderColor: 'divider'
          }}>
            <Typography variant="h5" color="primary">Description</Typography>
          </Box >
          <Paper
            sx={{
              p: 2,
              mt: 2,
              border: 1,
              borderRadius: 1,
              boxShadow: 4,
              borderColor: 'backdrop.dark',
            }}
          >
            <Typography>{recipeDescription}</Typography>
          </Paper>
        </Grid>

      </Grid>

      {/* Ingredients */}
      <Box px={{ md: 5, xl: 20 }}>
        <Box
          sx={{
            mt: 2,
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Typography variant="h5" color="primary">Ingredients</Typography>
        </Box >
        <Paper
          sx={{
            p: 2,
            mt: 2,
            border: 1,
            borderRadius: 1,
            boxShadow: 4,
            borderColor: 'backdrop.dark',
          }}
        >
          <Grid container spacing={{ md: 5, lg: 10 }}>

            <Grid item xs={12} md={6}>
              <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
                {col1.map(ingredient => (
                  <Box key={`${ingredient.ingredientId}-box`}>
                    <ListItem>
                      <ListItemText
                        primary={ingredient.quantityText}
                        secondary={ingredient.prepNotesText ? ingredient.prepNotesText : ' '}
                      />
                    </ListItem>
                    <Divider />
                  </Box>
                )
                )}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
                {col2.map(ingredient => (
                  <Box key={`${ingredient.ingredientId}-box`}>
                    <ListItem>
                      <ListItemText
                        primary={ingredient.quantityText}
                        secondary={ingredient.prepNotesText ? ingredient.prepNotesText : '-'}
                      />
                    </ListItem>
                    <Divider />
                  </Box>
                )
                )}
              </List>
            </Grid>

          </Grid>
        </Paper>
      </Box>


      {/* Directions */}
      <Box px={{ md: 5, xl: 20 }} sx={{ my: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Typography variant="h5" color="primary">Directions</Typography>
          <IconButton onClick={toggleEasyView} >
            <PlayArrowIcon
              size="large"
            />
          </IconButton>
        </Box >
        {orderedDirections.map((step, i) => (
          <Paper
            key={`paper-${i}`}
            sx={{
              p: 1,
              mt: 2,
              border: 1,
              borderRadius: 1,
              boxShadow: 4,
              borderColor: 'backdrop.dark',
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center'
            }}
          >
            <Button variant="text" id={`step-${i + 1}`} data-step-index={i} size="large" color="secondary" onClick={openStep}>Step {i + 1}</Button>
            <Typography sx={{ ml: 1, pl: 1, borderLeft: 1, borderColor: 'divider' }}>{step.stepText}</Typography>
          </Paper>
        ))}
      </Box>
      <Dialog
        fullScreen
        open={easyCookView}
        onClose={toggleEasyView}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleEasyView}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {recipeTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, display: 'flex', flexFlow: 'column', }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              pl: 2,
              bgcolor: 'background.default',
            }}
          >
            <Typography>{`Step ${parseInt(easyCookStep) + 1}`}</Typography>
          </Paper>
          <Box px={{xs: 1, md: '20%', xl: '25%'}}sx={{ width: '100%', my: 'auto', textAlign: 'center'}}>
            <Typography variant="h4">
              {orderedDirections[easyCookStep].stepText}
            </Typography>
          </Box>
          <MobileStepper
            variant="text"
            steps={orderedDirections.length}
            position="static"
            activeStep={easyCookStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={easyCookStep === orderedDirections.length - 1}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={easyCookStep === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Box>
      </Dialog>
    </Box>
  )
}