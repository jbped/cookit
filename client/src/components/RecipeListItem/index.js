// React
import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

// React Components
import ViewRecipe from '../../pages/ViewRecipe';

// Auth
import Auth from '../../utils/auth';

// Material UI components
import {
  Grid,
  Paper,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography
} from '@mui/material';

// Material UI methods
import { styled } from '@mui/material/styles';

// react-icons
import { IoMdTimer, IoIosPeople } from 'react-icons/io';

export default function RecipeListItem({ recipe }) {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', mt: 2, boxShadow: 4 }}>
      <Button component={Link} to={`/recipe/${recipe._id}`} variant='text' sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Typography variant="h6" color="primary">{recipe.recipeTitle}</Typography>
        {/* <p>Recipe Name</p> */}

        {/* Use MUI rating precision component if there is enought time*/}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '.1rem',
            }}
          >
            <IoMdTimer />
            <ListItemText
              sx={{
                color: 'secondary',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '.3rem',
              }}
            >
              <p>{recipe.cookTime}</p>
            </ListItemText>
          </ListItemIcon>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <IoIosPeople />
            <ListItemText
              sx={{
                color: 'secondary',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <p>{recipe.servings}</p>
            </ListItemText>
          </ListItemIcon>
        </Box>
      </Button>
    </Paper>
  );
}
