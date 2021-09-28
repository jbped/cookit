import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import store from "../../app/store.js"
import { useDispatch, useSelector } from "react-redux";
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
  const state = useSelector(state => state.global.sideNavVisible);
  const dispatch = useDispatch();

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    dispatch(sideNavVisible());
  };

  const trigger = useScrollTrigger();

  let location = useLocation();
  const onNewRecipe = location.pathname.includes('new-recipe')
  // console.log("url", window.location.pathname)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar in={trigger}>
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
            onClick={toggleDrawer()}
          >
            <MdMenu />
          </IconButton>
          <Typography variant="h3" component="div" color="primary" fontWeight="bold" sx={{ flexGrow: 1, textAlign: 'center', textShadow: "1"}}>
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
    // <Box sx={{
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   boxShadow: 3,
    //   position: 'fixed',
    //   top: 0,
    //   width: "100vw",
    //   zIndex: 1100,
    //   backgroundColor: '#FFFFFFD9',
    //   backdropFilter: 'blur(4px)'
    // }}>
    //   <IconButton
    //     aria-label="menu"
    //     color="primary"
    //     onClick={toggleDrawer()}
    //   >
    //     <MdMenu size={25} />
    //   </IconButton>
    //   <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
    //     <Typography variant="h4" sx={{ margin: '.4rem 0 .4rem 0' }}>CooKit</Typography>
    //   </Link>

    //   {/* Hides the add new recipe button when on the /new-recipe page */}
    //   {!onNewRecipe ?
    //     <Link to="/new-recipe" style={{ textDecoration: 'none', color: 'black' }}>
    //       <IconButton aria-label="add" color="primary">
    //         <MdAdd size={25} />
    //       </IconButton>
    //     </Link>
    //     :
    //     <IconButton aria-label="add" disabled color="primary">
    //       <MdAdd size={25} style={{ visibility: 'hidden' }} />
    //     </IconButton>
    //   }
    // </Box>
  )
}