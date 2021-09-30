// React imports
import React from 'react';
import { Link } from "react-router-dom";

// Global state 
import { sideNavVisible } from "../../utils/globalSlice.js"
import { useDispatch, useSelector } from "react-redux";

// Queries/Mutations
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

// Auth
import Auth from "../../utils/auth";

// Custom icons
import { GiKnifeFork, GiForkKnifeSpoon } from 'react-icons/gi';
import { MdSearch, MdSettings } from 'react-icons/md';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { IoIosJournal, IoIosLogIn } from 'react-icons/io';
import { VscChecklist } from 'react-icons/vsc';

// Material UI components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';



export default function Sidenav() {
  const state = useSelector(state => state.global.sideNavVisible);
  const dispatch = useDispatch();

  const anchor = {
    left: false,
  };

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }


    dispatch(sideNavVisible());
  };


  const { loading, data } = useQuery(QUERY_ME);
  console.log("userData", loading, data);
  const userData = data?.me || {};

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const userWelcome = (token) => {
    if (!token) {
      return '';
    } else {
      return (        
        <ListItem>
        <ListItemText>
            <h7>Hello, { userData.username }</h7>
        </ListItemText>
      </ListItem>
      )
    }
  }

  const imageData = [
    {
      img: 'https://i.pinimg.com/736x/16/27/b7/1627b7a21fffc3451299a03251c6b3fc.jpg',
      title: 'delicious-food'
    }
  ]

  const menuItems = [
    {
      name: "Discover",
      icon: <RiCompassDiscoverLine />,
      link: 'discover'
    },
    {
      name: "Search",
      icon: <MdSearch />,
      link: 'search'
    },
    {
      name: "My Kit",
      icon: <GiForkKnifeSpoon />,
      link: 'my-kit'
    },
    // {
    //   name: "Shopping List",
    //   icon: <VscChecklist />,
    //   link: 'my-kit/shopping-list'
    // },
    // {
    //   name: "Meal Planner",
    //   icon: <IoIosJournal />,
    //   link: 'meal-planner'
    // }
  ]

  const loginOption = () => {
    if (!token) {
      return "Login"
    } else {
      return "Logout"
    }
  }

  const linkOption = () => {
    if (!token) {
      return "login";
    } else {
      return "";
    }
  }

  const fnOption = () => {
    if (token) {
      return Auth.logout();
    } else {
      return ''
    }
  }

  const settingsMenuItems = [
    // {
  //   name: "Settings",
  //   icon: <MdSettings />,
  //   link: "settings",
  //   fn: null
  // },
    {
    name: loginOption(),
    icon: <IoIosLogIn />,
    link: linkOption(),
    fn: fnOption(),
  }]

  const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer()}
          onKeyDown={toggleDrawer()}
        >
          <List
            container
            rowSpacing={1}
          >
            <ListItem
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ListItemIcon
                sx={{
                  marginRight: '.1rem'
                }}
              >
                <h1><GiKnifeFork /></h1>
              </ListItemIcon>
              <ListItemText>
                CooKit
              </ListItemText>
            </ListItem>
            {userWelcome}
          </List>
          <Divider />
          <MenuList
            container
            rowSpacing={1}
          >
            {menuItems.map((menuItem) => (
              <Button
                key={menuItem.name}
                value={menuItem.name}
                component={Link}
                to={`/${menuItem.link}`}
                variant="text"
              >
              <MenuItem
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: '.1rem'
                  }}
                >
                  {menuItem.icon}
                </ListItemIcon>
                  <ListItemText>
                    {menuItem.name}
                  </ListItemText>
                </MenuItem>
                </Button>
            ))}
          </MenuList>
          <ImageList
            variant="masonry"
            cols={1}
            gap={0}
            container
          >
            <ImageListItem>
              <img
                src={`${imageData[0].img}?w=248&fit=crop&auto=format`}
                alt={imageData[0].title}
                loading="lazy"
              />
            </ImageListItem>
          </ImageList>
          <Box></Box>
          <MenuList
            container
            rowSpacing={1}
          >
            {settingsMenuItems.map((menuItem) => (
              <Button
              component={Link}
              to={`/${menuItem.link}`}
              variant="text"
                key={menuItem.name}
                value={menuItem.name}
            >
              <MenuItem
                button
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: '.1rem'
                  }}>
                  {menuItem.icon}
                </ListItemIcon>
                  <ListItemText>
                    {menuItem.name}
                  </ListItemText>
              </MenuItem>
              </Button>
            ))}
          </MenuList>
        </Box>
  )
  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment
          key={anchor}>
          <Grid
            container
            spacing={2}
          >
            <Grid item lg={4}>
              <Drawer
                anchor={anchor}
                open={state}
                onClose={toggleDrawer()}
              >
                {list(anchor)}
              </Drawer>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </div>
  )
};


// const logout = event => {
//   event.preventDefault();
//   Auth.logout();
// };