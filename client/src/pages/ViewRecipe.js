import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_RECIPE } from '../utils/queries'

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { setEasyCookStep, toggleEasyCookView, editThisRecipe } from '../utils/globalSlice';

import Auth from '../utils/auth'

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

import Loader from '../components/Loader'

// Icons....
import {
  MdEdit,
  MdAccessAlarm,
} from "react-icons/md";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import RestaurantIcon from '@mui/icons-material/Restaurant';

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

  const editRecipeGS = useSelector(state => state.global.editRecipe);
  

  // Query for the recipe
  const params = useParams();
  // console.log("params", params)

  const recipeId = params.id
  console.log("Recipe ID", recipeId)

  const { loading, data } = useQuery(QUERY_RECIPE, {
    variables: { recipeId: recipeId }
  });

  const recipe = data?.recipe || {};
  // console.log("this is the recipe returned", recipe)

  if (loading) {
    return <Loader></Loader>
  }

  // Destructuring of the keys in the recipe object received from the database
  const { recipeTitle, isPublic, creator, createdAt, recipeDescription, servings, cookTime, directions, directionsOrder, ingredients, ingredientsOrder } = recipe

  let orderedIngredients = [];
  let orderedDirections = []
  let editedDateArr = []
  let col1 = []
  let col2 = []

  if (!loading && data.recipe !== undefined) {
    // Splits the createdAt string into to indexes DD/MM/YYYY and time
    editedDateArr = createdAt.split(' at ');

    // Create new array of ingredients that is ordered appropriately by the ingredientsOrder

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
    col1 = orderedIngredients.slice(0, mid)
    col2 = orderedIngredients.slice(mid, orderedIngredients.length)
  }

  const editRecipe = () => {

    const convertedPublic = isPublic ? 'public' : 'private'

    let recipeObj = {
      recipeTitle,
      type: [],
      cookTime,
      servings,
      isPublic: convertedPublic,
      recipeDescription,
      columns: {
        ingredientsCol: {
          id: 'ingredientsCol',
          title: 'Ingredients',
          itemIds: ingredientsOrder // ingredientsOrder in DB
        },
        directionsCol: {
          id: 'directionsCol',
          title: 'Directions',
          itemIds: directionsOrder //directionsOrder in DB
        },
        deleteIngCol: {
          id: 'deleteIngCol',
          title: 'Delete',
          itemIds: [],
          deletedIds: []
        },
        deleteDirCol: {
          id: 'deleteDirCol',
          title: 'Delete',
          itemIds: [],
          deletedIds: []
        }
      },
      ingredientErrors: [],
      directionErrors: [],
      formCleared: false,
    }
    
    let ingObj = {}
    let dirObj = {}

    ingredients.forEach(ingredient => {
      ingObj = {...ingObj, [ingredient.ingredientId]: {...ingredient}}
    })

    recipeObj.ingredients = ingObj

    directions.forEach(step => {
      dirObj = {...dirObj, [step.stepId]: {...step}}
    })

    recipeObj.directions = dirObj

    pushToGlobal(recipeObj);

    // dispatch(editRecipe(recipeObj))

    console.log("editRecipe global state", editRecipeGS);

 window.location.assign(`${recipeId}/edit`)
  }

  const forkRecipe = () => {

  }
  const pushToGlobal = (recipeObj) => {
    dispatch(editThisRecipe(recipeObj));
  }

  // const profile = Auth.getProfile();
  // const { data: { username } } = profile

  const loggedIn = Auth.loggedIn()
  const profile = loggedIn ? Auth.getProfile() : null
  const loggedInCreator = profile ? profile.data.username === creator : false

  // Function called when a step button is pressed. Opens easy view to that desired step
  const openStep = e => {
    const selectedStep = parseInt(e.target.dataset.stepIndex)
    dispatch(setEasyCookStep(selectedStep))
    toggleEasyView()
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

  if (loading) {
    return <Loader></Loader>
  }

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
        {loggedIn ? (
          <Box>
            {loggedInCreator ? (
                <IconButton
                  onClick={editRecipe}
                >
                <MdEdit
                  size={25}
                  sx={{
                  }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={forkRecipe} >
                <RestaurantIcon
                  size={25}
                  sx={{
                  }}
                />
              </IconButton>
            )}
          </Box>
        ) : (
          <Box></Box>
        )}
        </Box>



      </Box>

      <Box ml={{ xs: 0, md: 5, xl: 20 }} sx={{ display: 'flex', alignItems: "center", }}>
        <Typography variant='subtitle1' mr={{ xs: 'auto', md: 2 }}>
          {loggedInCreator ? 
            `Created: ${editedDateArr[0][0] === '0' ? editedDateArr[0].slice(1) : editedDateArr[0]}` 
            : 
            `By: ${creator} - ${editedDateArr[0][0] === '0' ? editedDateArr[0].slice(1) : editedDateArr[0]}`
          }
        </Typography>
        {loggedInCreator && (
          <Typography variant="subtitle1" fontStyle="italic" color="secondary">&nbsp;
            {isPublic ?
              'Public'
              :
              'Private'
            }
          </Typography>
        )}
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
              />
              <Typography sx={{ ml: 1 }}>
                {cookTime}
              </Typography>
            </Box>

            {/* SERVING SIZE */}
            <Box sx={{ mt: 2, display: 'flex', alignItems: "center" }}>
              <BsPeople
                size={25}
              />

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
                        secondary={ingredient.prepNotesText ? ingredient.prepNotesText : '-'}
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
            <Typography>{`Step ${easyCookStep + 1}`}</Typography>
          </Paper>
          <Box px={{ xs: 1, md: '20%', xl: '25%' }} sx={{ width: '100%', my: 'auto', textAlign: 'center' }}>
            <Typography variant="h4">
              {orderedDirections[easyCookStep].stepText}
            </Typography>
          </Box>
          <MobileStepper
            variant="text"
            steps={orderedDirections.length}
            position="static"
            activeStep={parseInt(easyCookStep)}
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
};
