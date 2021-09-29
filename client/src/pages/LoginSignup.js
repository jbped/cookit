import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { Link } from "react-router-dom";

import {
  Grid,
  Box,
  Typography,
} from '@mui/material'

export default function LoginSignup({ page }) {
  return (
    <Box
      sx={{
        margin: 0,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid
        container
        justifyContent="center"
        sx={{
          width: '100%',
          padding: 2
        }}
      >
        <Grid item xs={12} sm={10} md={6} lg={4} xl={4}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <Typography variant="h2" component="div" color="primary" fontWeight="bold" sx={{ flexGrow: 1, textAlign: 'center', textShadow: "1"}}>
            Coo<Typography component="span" variant="h2" color="secondary" fontStyle="italic" fontWeight="bold" sx={{ flexGrow: 1 }}>Kit</Typography>
          </Typography>          
          </Link>
          {page === 'login' && <LoginForm />}
          {page === 'signup' && <SignupForm />}
        </Grid>
      </Grid>
    </Box>
  )
}