// React imports
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const imageData = [
    {
      img: 'https://i.pinimg.com/736x/16/27/b7/1627b7a21fffc3451299a03251c6b3fc.jpg',
      title: 'delicious-food'
    }
  ]

  const list = (anchor) => (
    <Router>
      <Switch>
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
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
                <GiKnifeFork />
              </ListItemIcon>              
              <ListItemText>
                  CooKit
              </ListItemText>
          </ListItem>
      </List>
            <Divider />
                <MenuList container rowSpacing={1}>
            <MenuItem button
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
              <RiCompassDiscoverLine />
            </ListItemIcon>
                <Route to="/discover">
                  <ListItemText>
                    Discover
                  </ListItemText>
                </Route>
        </MenuItem>
            <MenuItem button
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
                  <MdSearch />
           </ListItemIcon>
                <Route to="/search">
                  <ListItemText >
                    Search
                  </ListItemText>
                </Route>
        </MenuItem>
            <MenuItem button
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
                  <GiForkKnifeSpoon />
            </ListItemIcon>
                <Route to="/my-kit">
                  <ListItemText>
                      My Kit
                  </ListItemText>
                </Route>
        </MenuItem>
            <MenuItem button
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
                    <VscChecklist/>
            </ListItemIcon>
                <Route to="/shopping-list">
                  <ListItemText>
                      Shopping List
                  </ListItemText>
                </Route>
            </MenuItem>            
            <MenuItem button
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
                  <IoIosJournal />
              </ListItemIcon>           
              <Route to="/meal-planner">
                  <ListItemText>
                      Meal Planner
                  </ListItemText>
                </Route> 
          </MenuItem>
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
            <MenuItem button
            sx={{
              display: 'flex',
              alignItems: 'center'
              }}
            >
              <ListItemIcon
                sx={{
                marginRight:'.1rem'
                }}>
                <MdSettings/>
              </ListItemIcon>
              
              <Route to="/settings">
                <ListItemText>
                  Settings
                </ListItemText>
          </Route>
        </MenuItem>
            <MenuItem button
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
                <IoIosLogIn/>
          </ListItemIcon>
              <Route to="/login-logout">
                <ListItemText>
                  Login/Logout
                </ListItemText>
          </Route>
        </MenuItem>
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
            <MenuList>
              <MenuItem  onClick={toggleDrawer(anchor, true)}>
                <ListItemIcon fontSize="large">                  
                  <MdMenu/>
                </ListItemIcon>
              </MenuItem>
            </MenuList>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
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