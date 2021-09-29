// Import React components
import * as React from 'react'; import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Auth
import Auth from "../utils/auth.js";

// Import MUI components
import {
  Container,
  Grid,
  Box,
  Typography,
  Divider,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom Components.... 
import RecipeCard from "../components/RecipeCard";
import RecipeListItem from "../components/RecipeListItem";

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
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center',
          marginTop: '.4rem',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
      <Box sx={{ display: "flex", alignItems: 'center', }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
          >
            My Kit
          </Typography>
        </Box>
      <Box
      sx={{
        margin: 0,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'around',
        alignItems: 'center'
      }}
      >
        <Grid container
          spacing={{ md: 5, lg: 10 }}
          px={{ md: 5, xl: 20 }}
        >
          <Grid item
            xs={12} md={6}
          >
          <Box
            sx={{
              mt: 2,
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
            <Typography variant="h5" color="primary">Your Recipes</Typography>
          </Box >
              <Typography sx={{ ml: 1 }}>
                  Recipe Card / Recipe Row components should go here.
            </Typography>
            <Box>
              {/* <RecipeCard/> */}
              {/* <RecipeListItem/> */}
            </Box>
        </Grid>
          <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
      </Box>
    </Box>
  )
}