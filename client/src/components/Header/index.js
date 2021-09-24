import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

import {
  Box, 
  IconButton,
  Typography
} from '@mui/material'

import { MdMenu, MdAdd } from "react-icons/md";

export default function Header() {
  let location = useLocation();
  const onNewRecipe = location.pathname.includes('new-recipe')
  // console.log("url", window.location.pathname)

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 3,
      position: 'fixed',
      top: 0,
      width: "100vw",
      zIndex: 1100,
      backgroundColor: '#FFFFFFD9',
      backdropFilter: 'blur(4px)'
    }}>
      <IconButton aria-label="menu" color="primary">
        <MdMenu size={25} />
      </IconButton>
      <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
        <Typography variant="h4" sx={{ margin: '.4rem 0 .4rem 0' }}>CooKit</Typography>
      </Link>

      {/* Hides the add new recipe button when on the /new-recipe page */}
      {!onNewRecipe ?
      <Link to="/new-recipe" style={{textDecoration: 'none', color: 'black'}}>
        <IconButton aria-label="add" color="primary">
          <MdAdd size={25} />
        </IconButton>
      </Link>
        :
        <IconButton aria-label="add" disabled color="primary">
          <MdAdd size={25} style={{visibility:'hidden'}}/>
        </IconButton>
      }
    </Box>
  )
}