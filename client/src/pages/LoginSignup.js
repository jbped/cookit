import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

import {
  Grid, 
  Box
} from '@mui/material'

export default function LoginSignup({ page }) {
  return (
    <Box
      sx={{margin: 0,
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      left: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      {page === 'login' && <LoginForm />}
      {page === 'signup' && <SignupForm />}
    </Box>
  )
}