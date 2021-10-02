import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations'
import { Link } from "react-router-dom";

import Auth from '../../utils/auth';

// MUI Components....
import {
  Box,
  FormControl,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Paper
} from '@mui/material'

// Icons.... 
import {
  MdVisibility,
  MdVisibilityOff
} from "react-icons/md";

export default function SignupForm() {
  const initialState = {
    serverError: '',
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: false,
    showPassword: false,
    errorText: false,
  }

  const [values, setValues] = useState(initialState);

  const [addUser] = useMutation(ADD_USER)
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // Verifies if there are any issues with the provided information, send to errorHandler()
  const signupCheck = e => {
    e.preventDefault();
    let errors = {
      username: null,
      email: null,
      password: false,
    }
    if (values.username.length > 0 && /^[\w\.-]+$/.test(values.username)) {
      setValues(prevState => ({ ...prevState, usernameError: null }))
      errors.username = false;
    } else {
      setValues(prevState => ({ ...prevState, usernameError: 'validation' }))
      errors.username = true;
    }

    if (values.email.length > 0 && /^([\w\.-]+)@([\w\.-]+)\.([a-z\.]{2,6})$/.test(values.email)) {
      setValues(prevState => ({ ...prevState, emailError: null }))
      errors.email = false;
    } else {
      setValues(prevState => ({ ...prevState, emailError: 'validation' }))
      errors.email = true;
    }

    if (values.password.length >= 5) {
      setValues(prevState => ({ ...prevState, passwordError: false }))
      errors.password = false;
    } else {
      setValues(prevState => ({ ...prevState, passwordError: true }))
      errors.password = true;
    }

    
    errorHandler(errors)
  }

  // If there are errors set errorText in values state to true (triggers error text below Signup form)
  // Else initiate signup function 
  const errorHandler = ({ username, email, password }) => {
    if (username || email || password) {
      setValues(prevState => ({ ...prevState, errorText: true }))
      return;
    }

    setValues(prevState => ({ ...prevState, errorText: false }))
    signup()
  }

  // Collects username, email, and password from values state, mutates them, returns values to initialState
  const signup = async () => {
    // Send values.username, values.email, values.password to GraphQL
    console.log(`Signup created: \n   Username: ${values.username}\n   Email: ${values.email}\n   Password: ${values.password}`)
    try {
      const { data } = await addUser({
        variables: {
          Username: values.username,
          Email: values.email,
          Password: values.password
        }
      });
      console.log("1", data)
      const token = data.addUser.token
      Auth.login(token)
      // setValues(initialState)
    } catch (e) {
      console.error('Signup error:', e);
      if (e.toString().includes('username')) { 
        setValues(prevState => ({ ...prevState, usernameError: 'duplicate' }))
        setValues(prevState => ({ ...prevState, errorText: true }))
      } else if (e.toString().includes('email')) {
        setValues(prevState => ({ ...prevState, emailError: 'duplicate' }))
        setValues(prevState => ({ ...prevState, errorText: true }))
      }
    }
    // Clear return values state to initialState
  }

  return (
    <Paper
      component="form"
      sx={{
        mt: 2,
        padding: 2,
        border: 1,
        borderRadius: 1,
        borderColor: 'backdrop.dark',
        boxShadow: 4
      }}
      autoComplete="true"
      onSubmit={signupCheck}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }} color="primary">Signup</Typography>
        {values.errorText &&
          <Typography variant="h6" color="error" sx={{ fontStyle: 'italic' }}>
            &nbsp;- Error!
          </Typography>
        }
      </Box>
      
      <TextField
        id="username-required"
        label="Username *"
        value={values.username}
        fullWidth
        sx={{ mt: 2 }}
        error={values.usernameError}
        color="backdrop"
        InputLabelProps={{ color: "secondary" }}
        onChange={handleChange('username')}
        autoComplete="new-username"
      />
      {(values.usernameError === 'validation') ? 
        <Typography variant="subtitle2" color="error">
          Please provide a valid username
        </Typography>
      :
      (values.usernameError === 'duplicate') &&
        <Typography variant="subtitle2" color="error">
          Username already exists
        </Typography>
      }
      
      <TextField
        id="email-required"
        label="Email *"
        value={values.email}
        fullWidth
        sx={{ mt: 2 }}
        error={values.emailError}
        color="backdrop"
        InputLabelProps={{ color: "secondary" }}
        onChange={handleChange('email')}
        autoComplete="new-password"
      />
      {(values.emailError === 'validation') ? 
        <Typography variant="subtitle2" color="error">
          Please provide a valid email address
        </Typography>
      :
      (values.emailError === 'duplicate') &&
        <Typography variant="subtitle2" color="error">
          Email is already in use
        </Typography>
      }
      
      <FormControl sx={{ mt: 2, }} variant="outlined" fullWidth>
        <InputLabel htmlFor="password" color="secondary" error={values.passwordError}>Password *</InputLabel>
        <OutlinedInput
          id="password-required"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          error={values.passwordError}
          onChange={handleChange('password')}
          color="backdrop"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password *"
        />
      </FormControl>
        {values.passwordError ? 
          <Typography variant="subtitle2" color="error">
            Error - Password must be a minimum of 5 characters
          </Typography>
          :
          <Typography variant="subtitle2" color="grey" sx={{ fontStyle: 'italic' }}>
            Password must be a minimum of 5 characters
          </Typography>
        }
        
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button component={Link} to="/login" variant="text" color="primary" sx={{ mt: 2, }}>Login instead</Button>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Signup</Button>
      </Box>

    </Paper >
  )
}