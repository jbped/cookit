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
  Button,
  Typography,
} from '@mui/material';

// react-icons
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export default function RecipeListItem({ recipe }) {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', mt: 2, boxShadow: 4 }}>
      <Button component={Link} to={`/recipe/${recipe._id}`} variant='text' sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5 }}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" color="primary" sx={{ ml: 1 }}>{recipe.recipeTitle}</Typography>
          </Grid>
          {/* <p>Recipe Name</p> */}

          {/* Use MUI rating precision component if there is enought time*/}
          <Grid item xs={12} md={4}>
            <Box sx={{display: 'flex'}} justifyContent={{ xs: 'start', md: 'space-between'}}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                  flexGrow: 1,
                  ml: 1,
                }}
                mr={{xs: 3, md: 0}}
              >
                <AccessAlarmIcon color="secondary"/>
                <Typography
                  variant='body1'
                  color='white'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: 1
                  }}
                >
                  {recipe.cookTime}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                  mr: 2,
                }}
              >
                <PeopleAltIcon color="secondary"/>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    display: 'flex',
                    alignItems: 'end',
                    ml: 1
                  }}
                >
                  {recipe.servings}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Button>
    </Paper>
  );
}
