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
  Typography,
  Paper
} from '@mui/material'

// Icons.... 
import {
  MdVisibility,
  MdVisibilityOff
} from "react-icons/md";

export default function LoginForm() {
  const initialState = {
    username: '',
    usernameError: false,
    password: '',
    passwordError: false,
    showPassword: false,
  }

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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

  const loginCheck = e => {
    e.preventDefault();
    let errors = {
      username: false,
      password: false,
    }
    if (values.username.length > 0) {
      setValues(prevState => ({ ...prevState, usernameError: false }))
      errors.username = false;
    } else {
      setValues(prevState => ({ ...prevState, usernameError: true }))
      errors.username = true;
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

  // If there are errors set errorText in values state to true (triggers error text below Login form)
  // Else initiate login function 
  const errorHandler = ({ username, email, password }) => {
    if (username || password) {
      setValues(prevState => ({ ...prevState, errorText: true }))
      return;
    }

    setValues(prevState => ({ ...prevState, errorText: false }))
    login()
  }

  // Collects username, email, and password from values state, mutates them, returns values to initialState
  const login = () => {
    // Send values.username, values.email, values.password to GraphQL
    console.log(`Login: \n   Username: ${values.email}\n   Password: ${values.password}`)
    // Clear return values state to initialState
    setValues(initialState)
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
      onSubmit={loginCheck}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }} color="primary">Login</Typography>
        {values.errorText &&
          <Typography variant="h6" color="error" sx={{ fontStyle: 'italic' }}>
            &nbsp;- Error!
          </Typography>
        }
      </Box>
      <TextField
        id="username-required"
        label="Username *"
        defaultValue=""
        fullWidth
        name="username"
        sx={{ mt: 2 }}
        value={values.username}
        error={values.usernameError}
        color="backdrop"
        InputLabelProps={{ color: "secondary" }}
        onChange={handleChange}
      />
      {values.usernameError && <Typography variant="subtitle2" color="error" sx={{ mb: 1 }}>Please provide a username</Typography>}
      <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
        <InputLabel htmlFor="password" color="secondary" error={values.passwordError}>Password *</InputLabel>
        <OutlinedInput
          id="password-required"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          error={values.passwordError}
          name="password"
          onChange={handleChange}
          color="backdrop"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                color="backdrop"
              >
                {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password *"
        />
      </FormControl>
      {values.passwordError && <Typography variant="subtitle2" color="error" sx={{ mb: 1 }}>Please provide a password</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button component={Link} to="/signup" variant="text" color="primary" sx={{ mt: 2, }}>Signup instead</Button>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Login</Button>
      </Box>
    </Paper>

  )
}