import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import LandingPage from '../components/LandingPage';
import { Link, Redirect, useParams } from "react-router-dom";

import Auth from "../utils/auth"

import {
  Grid,
  Box,
  Typography,
} from '@mui/material'

export default function LoginSignup({ page }) {

  // const  { username: userParam } = useParams();
  // If loggedIn token returns the username that matches the userParam, user is redirected to the main page (/my-kit) file
  // console.log(Auth);
  if (Auth.loggedIn()) {
    return <Redirect to="/my-kit " />
  }

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
          {page === '/' && <LandingPage />}
          {page === 'login' && <LoginForm />}
          {page === 'signup' && <SignupForm />}
        </Grid>
      </Grid>
    </Box>
  )
}