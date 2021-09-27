import React, { useState } from 'react'
import { Link } from "react-router-dom";

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
  Typography
} from '@mui/material'

// Icons.... 
import {
  MdVisibility,
  MdVisibilityOff
} from "react-icons/md";

export default function SignupForm() {
  const initialState = {
    username: '',
    usernameError: false,
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
    showPassword: false,
    errorText: false,
  }

  const [values, setValues] = useState(initialState);

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
      username: false,
      email: false,
      password: false,
    }
    if (values.username.length > 0) {
      setValues(prevState => ({ ...prevState, usernameError: false }))
      errors.username = false;
    } else {
      setValues(prevState => ({ ...prevState, usernameError: true }))
      errors.username = true;
    }

    if (values.email.length > 0 && /.+@.+\..+/.test(values.email)) {
      setValues(prevState => ({ ...prevState, emailError: false }))
      errors.email = false;
    } else {
      setValues(prevState => ({ ...prevState, emailError: true }))
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
  const signup = () => {
    // Send values.username, values.email, values.password to GraphQL
    console.log(`Signup created: \n   Username: ${values.email}\n   Email: ${values.email}\n   Password: ${values.password}`)
    // Clear return values state to initialState
    setValues(initialState)
  }

  return (
    <Box
      component="form"
      sx={{
        mt: 2,
        padding: 2,
        border: 1,
        borderRadius: 1,
        borderColor: 'grey.300',
        backgroundColor: '#FFFFFF',
        boxShadow: 2
      }}
      onSubmit={signupCheck}
    >
      <Box sx={{ display: 'flex', mt: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Signup</Typography>
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
        onChange={handleChange('username')}
      />
      {values.usernameError && <Typography variant="subtitle2" color="error">Please provide a username</Typography>}
      
      <TextField
        id="email-required"
        label="Email *"
        value={values.email}
        fullWidth
        sx={{ mt: 1 }}
        error={values.emailError}
        onChange={handleChange('email')}
      />
      {values.emailError && <Typography variant="subtitle2" color="error">Please provide a valid email address</Typography>}
      
      <FormControl sx={{ mt: 1, }} variant="outlined" fullWidth>
        <InputLabel htmlFor="password" error={values.passwordError}>Password *</InputLabel>
        <OutlinedInput
          id="password-required"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          error={values.passwordError}
          onChange={handleChange('password')}
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
        <Button component={Link} to="/login" variant="text " color="grey" sx={{ mt: 2, }}>Login instead</Button>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Signup</Button>
      </Box>

    </Box >
  )
}