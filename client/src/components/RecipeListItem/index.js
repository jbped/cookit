// React
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  let location = useLocation();
  const discover = location.pathname.includes('discover');

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', mt: 2, boxShadow: 4 }}>
      <Button component={Link} to={`/recipe/${recipe._id}`} variant='text' sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5 }}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Box sx={{display: 'flex'}} justifyContent={{xs: 'space-between', md: 'flex-start', alignItems: 'center'}}>
              <Typography variant="h6" color="primary" sx={{ ml: 1 }}>{recipe.recipeTitle}</Typography>
              {discover &&
                <Typography variant="body2" color="backdrop.light" sx={{ mr: 1, display: 'inline-block' }} ml={{md: 2}}>Created by <Typography variant="body2" component='span' color="primary" sx={{display: 'inline-block'}}>{recipe.creator}</Typography></Typography>}
            </Box>
          </Grid>
          {/* <p>Recipe Name</p> */}

          {/* Use MUI rating precision component if there is enough time*/}
          <Grid item xs={12} md={4} sx={{alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}} justifyContent={{ xs: 'start', md: 'space-between'}}>
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
                  mr: 2,
                }}
              >
                <PeopleAltIcon color="secondary"/>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
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