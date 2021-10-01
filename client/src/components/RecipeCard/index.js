import * as React from 'react';
import { Link } from 'react-router-dom';

///Icons.... 
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';



import {
  Card, 
  CardHeader, 
  CardContent,
  IconButton,
  Typography,
  Box,
  Button, 
} from '@mui/material'

export default function RecipeReviewCard({recipe}) {

  let editedDateArr = recipe.createdAt.split(' at ')
  
  return (
      <Card sx={{ boxShadow: 4, height: '100%'}}>
        <Button
          component={Link}
          to={`/recipe/${recipe._id}`}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            p: 2
          }}
        >
          <CardHeader
            sx={{
              color: 'primary',
              padding: 0,
            }}
            action={<IconButton aria-label='settings'></IconButton>}
            title={recipe.recipeTitle}
            subheader={`Created: ${editedDateArr[0][0] === '0' ? editedDateArr[0].slice(1) : editedDateArr[0]}`}
          />
        </Button>
        <CardContent sx={{py: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography
            variant='body1'
            color='text.light'
          >
            {recipe.recipeDescription}
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
            <Box sx={{ display: 'flex', alignContent: 'center'}}>
              <AccessAlarmIcon color="secondary" sx={{mr: 1}}/>
              <Typography>
                {recipe.cookTime}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignContent: 'center'}}>
              <PeopleAltIcon  color="secondary" sx={{mr: 1}}/>
              <Typography>
                {recipe.servings}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
}
