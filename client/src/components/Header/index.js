import React from 'react';
import { useLocation } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { sideNavVisible } from "../../utils/globalSlice.js"
import { Link } from "react-router-dom";

import Auth from '../../utils/auth'

import {
  Box,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material'

import { MdMenu, MdAdd } from "react-icons/md";

export default function Header() {
  const dispatch = useDispatch();

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    dispatch(sideNavVisible());
  };

  const loggedIn = Auth.loggedIn()

  let location = useLocation();
  const onNewRecipe = location.pathname.includes('new-recipe')
  // console.log("url", window.location.pathname)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="light"
            aria-label="menu"
            // sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MdMenu />
          </IconButton>
          { loggedIn ? (
            <Typography variant="h3" component={Link} to="/my-kit" color="primary" fontWeight="bold" 
              sx={{ 
                textDecoration: 'none', 
                flexGrow: 1, 
                textAlign: 'center', 
                textShadow: "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
              }}>
              Coo<Typography component="span" variant="h3" color="secondary" fontStyle="italic" fontWeight="bold" sx={{ flexGrow: 1 }}>Kit</Typography>
            </Typography>
          ) : (
            <Typography variant="h3" component={Link} to="/discover" color="primary" fontWeight="bold" 
              sx={{ 
                textDecoration: 'none', 
                flexGrow: 1, 
                textAlign: 'center', 
                textShadow: "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
              }}>
              Coo<Typography component="span" variant="h3" color="secondary" fontStyle="italic" fontWeight="bold" sx={{ flexGrow: 1 }}>Kit</Typography>
            </Typography>
          )}
          {!onNewRecipe ?
            <IconButton component={Link} to="/new-recipe" aria-label="add" edge="end" color="light">
              <MdAdd />
            </IconButton>
            :
            <IconButton aria-label="add" disabled color="light">
              <MdAdd size={25} style={{ visibility: 'hidden' }} />
            </IconButton>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}