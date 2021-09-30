import React from 'react';
import { useLocation } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { sideNavVisible } from "../../utils/globalSlice.js"
import { Link } from "react-router-dom";

import {
  Box,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  useScrollTrigger
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
          <Typography variant="h3" component={Link} to="/my-kit" color="primary" fontWeight="bold" sx={{ textDecoration: 'none', flexGrow: 1, textAlign: 'center', textShadow: "1"}}>
            Coo<Typography component="span" variant="h3" color="secondary" fontStyle="italic" fontWeight="bold" sx={{ flexGrow: 1 }}>Kit</Typography>
          </Typography>
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