import React from 'react'

// Custom Components.... 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RecipeCard from "../components/RecipeCard";
import RecipeListItem from "../components/RecipeListItem";

export default function MyKit() {
  return (
      <Grid
      container
    >
      {/* <Grid container>
      <Box sx={{
        display: "inline-block"
      }}
      >
      <RecipeCard />
      </Box>
      </Grid> */}
      <Grid container>
        
      <Box sx={{
        display: "inline-block"
      }}
      >
      <RecipeListItem />
      </Box>
      </Grid>
      </Grid>
  )
}