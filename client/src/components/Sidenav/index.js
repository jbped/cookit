import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { GiKnifeFork, GiForkKnifeSpoon } from 'react-icons/gi';
import { MdSearch, MdSettings, MdMenu } from 'react-icons/md';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { IoIosJournal, IoIosLogIn } from 'react-icons/io';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
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
          <ListItem>
            <ListItemIcon>
            <p><span><GiKnifeFork/></span>  CooKit</p>
            </ListItemIcon>
          </ListItem>
      </List>
            <Divider />
                <MenuList container rowSpacing={1}>
          <MenuItem button >
          <ListItemIcon>
            <Route to="/discover"><p><span><RiCompassDiscoverLine/></span>  Discover</p></Route>
            </ListItemIcon>
        </MenuItem>
        <MenuItem button>
          <ListItemIcon>
            <Route to="/search"><p><span><MdSearch/></span>  Search</p></Route>
            </ListItemIcon>
        </MenuItem>
        <MenuItem button>
          <ListItemIcon>
            <Route to="/my-kit"><p><span><GiForkKnifeSpoon/></span>  My Kit</p></Route>
            </ListItemIcon>
        </MenuItem>
        <MenuItem button>
          <ListItemIcon>
            <Route to="/meal-planner"><p><span><IoIosJournal/></span>  Meal Planner</p></Route>
            </ListItemIcon>
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
      <MenuList container rowSpacing={1}>
        <MenuItem button>
          <ListItemIcon>
          <Route to="/settings"><p><span><MdSettings/></span>  Settings</p></Route>
          </ListItemIcon>
        </MenuItem>
        <MenuItem button>
          <ListItemIcon>
          <Route to="/login-logout"><p><span><IoIosLogIn/></span>  Login/Logout</p></Route>
          </ListItemIcon>
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