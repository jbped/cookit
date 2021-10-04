import React from 'react'

import {
  Box, 
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', mt: 1}}> 
    <Box sx={{ mr: 2, pr: 2, borderRight: 1, borderColor: 'backdrop.main'}}>
      <Button component={Link} to="/signup" variant="text" color="backdrop" size="large" >Signup</Button>
    </Box>
      <Button component={Link} to="/login" variant="text" color="backdrop" size="large">Login</Button>
    </Box>
  )
}