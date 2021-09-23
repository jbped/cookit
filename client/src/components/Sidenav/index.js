import React from 'react';
import { Link } from 'react-router-dom';

import { GiKnifeFork, GiForkKnifeSpoon } from 'react-icons/gi';
import { MdExpandMore, MdSearch, MdSettings } from 'react-icons/md';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { IoIosJournal, IoIosLogIn } from 'react-icons/io';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListBar from '@mui/material/ImageListItemBar';


export default function Sidenav() {
  const [state, setState] = React.useState({
    Menu: false,
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
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem>
            <ListItemIcon>
            <p><span><GiKnifeFork/></span>  CooKit</p>
            </ListItemIcon>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button >
          <ListItemIcon>
            <p><span><RiCompassDiscoverLine/></span>  Discover</p>
            </ListItemIcon>
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <p><span><MdSearch/></span>  Search</p>
            </ListItemIcon>
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <p><span><GiForkKnifeSpoon/></span>  My Kit</p>
            </ListItemIcon>
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <p><span><IoIosJournal/></span>  Meal Planner</p>
            </ListItemIcon>
          </ListItem>
      </List>
      <ImageList variant="masonry" cols={1} gap={0}>
        <ImageListItem>
          <img
            src={`${imageData[0].img}?w=248&fit=crop&auto=format`}
            alt={imageData[0].title}
            loading="lazy"
          />
        </ImageListItem>
      </ImageList>
      <List>
        <ListItem button>
          <ListItemIcon>
          <p><span><MdSettings/></span>  Settings</p>
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
          <p><span><IoIosLogIn/></span>  Login/Logout</p>
          </ListItemIcon>
        </ListItem>
      </List>
    </Box>
  )
  return (
    <div>
    {['Menu'].map((anchor) => (
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    ))}
  </div>
    )
};