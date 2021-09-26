// React imports
import React /*{useEffect}*/ from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Global state 
import store from "../../app/store.js"
import { sideNavVisible} from "../../utils/globalSlice.js"
import { useDispatch, useSelector } from "react-redux";

// Import Hover/Popovers
import HoverPopover from 'material-ui-popup-state/HoverPopover'

// Custom icons
import { GiKnifeFork, GiForkKnifeSpoon } from 'react-icons/gi';
import { MdSearch, MdSettings, MdMenu } from 'react-icons/md';
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



export default function Sidenav() {
  const state = useSelector(state => state.global.sideNavVisible);
  const dispatch = useDispatch();

  // useEffect(() => {
    
  // })

  const anchor = {
    left: false,
  };

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }


    dispatch(sideNavVisible());
  };

  const imageData = [
    {
      img: 'https://i.pinimg.com/736x/16/27/b7/1627b7a21fffc3451299a03251c6b3fc.jpg',
      title: 'delicious-food'
    }
  ]

  const menuItems = [{
    name: "Discover",
    icon: <RiCompassDiscoverLine />
  }, {
    name: "Search",
    icon: <MdSearch />
    }, {
    name: "My Kit",
    icon: <GiForkKnifeSpoon />
    }, {
    name: "Shopping List",
    icon: <VscChecklist/>
    }, {
    name: "Meal Planner",
    icon: <IoIosJournal />
    }]
  
  const settingsMenuItems = [{
    name: "Settings",
    icon: <MdSettings/>
  }, {
    name: "Login/Logout",
    icon: <IoIosLogIn/>
  }]

  const list = (anchor) => (
    <Router>
      <Switch>
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List container rowSpacing={1}>
            <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center'
              }}
            >
              <ListItemIcon
              sx={{
                marginRight:'.1rem'
                }}
              >
                <h1><GiKnifeFork /></h1>
              </ListItemIcon>              
              <ListItemText>
                  <h1>CooKit</h1>
              </ListItemText>
          </ListItem>
      </List>
            <Divider />
          <MenuList container rowSpacing={1}>
            {menuItems.map((menuItem) => (

              <MenuItem
                key={menuItem.name}
                value={menuItem.name}
                button
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
  <ListItemIcon
  sx={{
    marginRight:'.1rem'
    }}
  >
  {menuItem.icon}
</ListItemIcon>
    <Route to="/discover">
      <ListItemText>
        {menuItem.name}
      </ListItemText>
    </Route>
</MenuItem>
            ))}
      </MenuList>
      <ImageList variant="masonry" cols={1} gap={0} container>
        <ImageListItem>
          <img
            src={`${imageData[0].img}?w=248&fit=crop&auto=format`}
            alt={imageData[0].title}
            loading="lazy"
          />
        </ImageListItem>
          </ImageList>
          <Box></Box>
          <MenuList container rowSpacing={1}>
            {settingsMenuItems.map((menuItem) => (
              <MenuItem
                key={menuItem.name}
                value={menuItem.name}
                button
            sx={{
              display: 'flex',
              alignItems: 'center'
              }}
            >
              <ListItemIcon
                sx={{
                marginRight:'.1rem'
                }}>
                {menuItem.icon}
              </ListItemIcon>
              
              <Route to="/settings">
                  <ListItemText>
                    {menuItem.name}
                </ListItemText>
          </Route>
        </MenuItem>
            ))}
      </MenuList>
    </Box>
      </Switch>
      </Router>
  )
  return (
    <div>
    {['left'].map((anchor) => (
      <React.Fragment key={anchor}>
        <Grid container spacing={2}>
          <Grid item lg={4}>
            {/* <MenuList>
              <MenuItem  onClick={toggleDrawer(anchor, true)}>
                <ListItemIcon fontSize="large">                  
                  <MdMenu/>
                </ListItemIcon>
              </MenuItem>
            </MenuList> */}
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