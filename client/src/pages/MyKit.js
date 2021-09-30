// Import React components
import * as React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// Auth
import Auth from '../utils/auth.js';

// Import MUI components
import {
  Grid,
  Box,
  Divider,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom Components....
import RecipeCard from '../components/RecipeCard';
import RecipeListItem from '../components/RecipeListItem';

export default function MyKit() {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));

  return (
    <Box
      mx={{ xs: 0, md: 5, xl: 20 }}
      sx={{
        pt: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '.4rem',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h4' fontWeight='bold' color='primary'>
          My Kit
        </Typography>
      </Box>
      <Box
        mx={{ xs: 0, md: 5, xl: 20 }}
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box px={{ md: 5, xl: 20 }}>
          <Box
            sx={{
              mt: 2,
              borderBottom: 1,
              borderColor: 'divider',
              margin: 2
            }}
          >
            <Typography variant='h5' color='secondary'>
              My Recipes
            </Typography>
          </Box>
          {/* <Paper
          sx={{
            p: 2,
            mt: 2,
            border: 1,
            borderRadius: 1,
            boxShadow: 4,
            borderColor: 'backdrop.dark',
          }}
        > */}
          <Grid container spacing={{ md: 5, lg: 10 }}>
            <Grid item xs={12} md={6}>
              <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
                <Box key={`-box`}>
                  <ListItem>
                    <RecipeCard />
                    <ListItemText
                    // primary={}
                    // secondary={ ? : ' '}
                    />
                  </ListItem>
                  {/* <Divider /> */}
                </Box>
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
                <Box key={`-box`}>
                  <ListItem>
                    <RecipeListItem />
                    <ListItemText
                    // primary={}
                    // secondary={ ?  : '-'}
                    />
                  </ListItem>
                  {/* <Divider /> */}
                </Box>
              </List>
            </Grid>
          </Grid>
          {/* </Paper> */}
        </Box>
      </Box>
    </Box>
  );
}

{
  /* <Grid item xs={12} md={6}>
          <Box sx={{
            mt: 2,
            borderBottom: 1,
            borderColor: 'divider'
          }}>
            <Typography variant="h5" color="primary">Shopping List</Typography>
          </Box >          
            <Typography>Shopping List Component should go here.</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{
            mt: 2,
            borderBottom: 1,
            borderColor: 'divider'
          }}>
            <Typography variant="h5" color="primary">Meal Planner</Typography>
          </Box >
            <Typography>Meal Planner component should go here.</Typography>
        </Grid> */
}
