// React imports
import React from 'react';
import { Link, useParams } from "react-router-dom";

// Global state 
import { sideNavVisible } from "../../utils/globalSlice.js"
import { useDispatch, useSelector } from "react-redux";

// Material UI components
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  // ImageList,
  // ImageListItem,
  ListItemText,
  MenuList,
  MenuItem,
  Grid,
  Button,
  Typography,
  // SwipeableDrawer, StyledBox
} from '@mui/material/';

// Auth
import Auth from "../../utils/auth";

// Custom icons
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { /*IoIosJournal,*/ IoIosLogIn } from 'react-icons/io';
import { MdSearch, /*MdSettings*/ } from 'react-icons/md';
import { GiKnifeFork, /*GiForkKnifeSpoon */ } from 'react-icons/gi';
// import { RiCompassDiscoverLine } from 'react-icons/ri';
// import { VscChecklist } from 'react-icons/vsc'

// Queries/Mutations
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC } from '../../utils/queries';

export default function Sidenav() {
  const state = useSelector(state => state.global.sideNavVisible);
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params)

  // const anchor = {
  //   left: false,
  // };

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    dispatch(sideNavVisible());
  };

  const handleLogout = () => {
    console.log('logout called')
    Auth.logout();
  }


  const { loading, data } = useQuery(QUERY_ME_BASIC);

  if (loading) {
    console.log('loading', loading)
  } else {
    // console.log("userData", data);
  }

  const userData = data?.me || {};

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  console.log('token', token)

  // const imageData = [
  //   {
  //     img: 'https://i.pinimg.com/736x/16/27/b7/1627b7a21fffc3451299a03251c6b3fc.jpg',
  //     title: 'delicious-food'
  //   }
  // ]

  // const menuItems = [
  //   // {
  //   //   name: "Discover",
  //   //   icon: <RiCompassDiscoverLine />,
  //   //   link: 'discover'
  //   // },
  //   // {
  //   //   name: "Search",
  //   //   icon: <MdSearch />,
  //   //   link: 'search'
  //   // },
  //   // {
  //   //   name: "My Kit",
  //   //   icon: <GiForkKnifeSpoon />,
  //   //   link: 'my-kit'
  //   // },
  //   // {
  //   //   name: "New Recipe",
  //   //   icon: <PostAddOutlinedIcon />,
  //   //   link: 'new-recipe'
  //   // },
  //   // {
  //   //   name: "Shopping List",
  //   //   icon: <VscChecklist />,
  //   //   link: 'my-kit/shopping-list'
  //   // },
  //   // {
  //   //   name: "Meal Planner",
  //   //   icon: <IoIosJournal />,
  //   //   link: 'meal-planner'
  //   // }
  // ]

  // const fnOption = () => {
  //   if (token) {
  //     return Auth.logout();
  //   } else {
  //     return
  //   }
  // }

  // const settingsMenuItems = [
  //   // {
  //   //   name: "Settings",
  //   //   icon: <MdSettings />,
  //   //   link: "settings",
  //   //   fn: null
  //   // },
  //   {
  //     name: loginOption(),
  //     icon: <IoIosLogIn />,
  //     link: linkOption(),
  //     fn: fnOption(),
  //   }]

  return (
    <Drawer
      anchor="left"
      open={state}
      onClose={toggleDrawer()}
      variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        sx={{ width: 250, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        role="presentation"
        onClick={toggleDrawer()}
        onKeyDown={toggleDrawer()}
      >
        <Box sx={{ flexGrow: 1 }}>
          <List
            
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
                <Typography variant="h4" color="primary" fontWeight="bold" sx={{ textShadow: "1" }}>
                  Coo<Typography component="span" variant="h4" color="secondary" fontStyle="italic" fontWeight="bold" sx={{ flexGrow: 1 }}>Kit</Typography>
                </Typography>
              </ListItemText>
            </ListItem>
            {Auth.loggedIn() ?
              (
                <ListItem>
                  <ListItemText>
                    <Typography>Hello, {userData.username}</Typography>
                  </ListItemText>
                </ListItem>
              )
              :
              ('')
            }
          </List>
          <Divider />
          <MenuList
            
          >
            <Button component={Link} to="/my-kit" variant="text" sx={{ mt: 2 }}>
              <MenuItem
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ListItemIcon
                  sx={{ marginRight: '.1rem', fontSize: 21 }}
                >
                  <MdSearch />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">
                    My Kit
                  </Typography>
                </ListItemText>
              </MenuItem>
            </Button>

            <Button component={Link} to="/new-recipe" variant="text" sx={{ mt: 2 }}>
              <MenuItem
                sx={{
                  display: 'flex',
                  alignItems: 'center',

                }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: '.1rem'
                  }}
                >
                  <PostAddOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">
                    New Recipe
                  </Typography>
                </ ListItemText>
              </MenuItem>
            </Button>
          </MenuList>
          {/* <ImageList
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
        </ImageList> */}

        </Box>
        {/* Settings and Logout menu list */}
        <MenuList
          sx={{ bottom: 0 }}
        >
          {Auth.loggedIn() ?
            <Button
              variant="text"
              value="Logout"
              onClick={handleLogout}
              size="large"
            >
              <MenuItem
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: '.1rem',
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}>
                  <IoIosLogIn />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">
                    Logout
                  </Typography>
                </ListItemText>
              </MenuItem>
            </Button>
            :
            <Button
              component={Link}
              to="/login"
              variant="text"
              value="Login"
            // onClick={toggleDrawer()}
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
                  }}>
                  <IoIosLogIn />
                </ListItemIcon>
                <ListItemText>
                  Login
                </ListItemText>
              </MenuItem>
            </Button>
          }
        </MenuList>
      </Box>
    </Drawer>
  )
};