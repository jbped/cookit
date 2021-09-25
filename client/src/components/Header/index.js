import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { sideNavVisible} from "../../utils/globalSlice.js"
import {
  Box, IconButton
} from '@mui/material'
import { MdMenu, MdAdd } from "react-icons/md";

export default function Header() {
  const state = useSelector(state.global.sideNavVisible);
  const dispatch = useDispatch();
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    dispatch(sideNavVisible());
  };


  let location = useLocation();
  const onNewRecipe = location.pathname.includes('new-recipe')
  // console.log("url", window.location.pathname)

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '1em',
      paddingRight: '1em',
      boxShadow: 3
    }}>
      <IconButton
        aria-label="menu"
        color="primary"
        onClick={toggleDrawer()}
      >
        <MdMenu size={25}/>
      </IconButton>

      <h1 style={{ margin: '.4rem 0 .4rem 0' }}>CooKit</h1>

      {/* Hides the add new recipe button when on the /new-recipe page */}
      {!onNewRecipe ?
        <IconButton aria-label="add" color="primary">
          <MdAdd size={25} />
        </IconButton>
        :
        <IconButton aria-label="add" disabled color="primary">
          <MdAdd size={25} style={{display:'none'}}/>
        </IconButton>
      }
    </Box>
  )
}