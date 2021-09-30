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
} from '@mui/material/';

// Auth
import Auth from "../../utils/auth";

// Custom icons
import { MdSearch, MdSettings } from 'react-icons/md';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { /*IoIosJournal,*/ IoIosLogIn } from 'react-icons/io';
import { GiKnifeFork, /*GiForkKnifeSpoon */ } from 'react-icons/gi';
// import { RiCompassDiscoverLine } from 'react-icons/ri';
// import { VscChecklist } from 'react-icons/vsc'

// Queries/Mutations
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC } from '../../utils/queries';

export default function Sidenav() {
  const state = useSelector(state => state.global.sideNavVisible);
  const dispatch = useDispatch();

  // const anchor = {
  //   left: false,
  // };

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    dispatch(sideNavVisible());
  };


  const { loading, data } = useQuery(QUERY_ME_BASIC);

  // if (loading) {
  //   // console.log('loading', loading)
  // } else {
  //   // console.log("userData", data);
  // }

  const userData = data?.me || {};

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  // console.log('token', token)

  const userWelcome = (token) => {
    if (!token) {
      return '';
    } else {
      return (
        <ListItem>
          <ListItemText>
            <Typography>Hello, {userData.username}</Typography>
          </ListItemText>
        </ListItem>
      )
    }
  }

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

  const fnOption = () => {
    if (token) {
      return Auth.logout();
    } else {
      return
    }
  }

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

  const list = () => (
    <Box
      sx={{ width: 250, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <Box sx={{ flexGrow: 1 }}>
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
              <Typography variant="h4" color="primary" fontWeight="bold" sx={{ textShadow: "1" }}>
                Coo<Typography component="span" variant="h4" color="secondary" fontStyle="italic" fontWeight="bold" sx={{ flexGrow: 1 }}>Kit</Typography>
              </Typography>
            </ListItemText>
          </ListItem>
          {userWelcome}
        </List>
        <Divider />
        <MenuList
          container
          rowSpacing={1}
        >
          <Button variant="text">
            <MenuItem
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 2
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

          <Button component={Link} to="/new-recipe" variant="text">
            <MenuItem
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 2
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
        <Box></Box>

      </Box>
      {/* Settings and Logout menu list */}
      <MenuList
        container
        sx={{ bottom: 0 }}
        rowSpacing={1}
      >
        {token ?
          <Button
            variant="text"
            value="Logout"
            onClick={fnOption}
            size="large"
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