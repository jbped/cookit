import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// Themes....
import './App.scss';
import theme from './theme.js'

// React Router Pages....
import NewRecipePage from './pages/NewRecipe';
import ViewRecipe from './pages/ViewRecipe';
import MyKit from './pages/MyKit';
import LoginSignup from './pages/LoginSignup';

// Components....
import { Box, ThemeProvider } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header'
import Sidenav from "./components/Sidenav";

function App() {
  let location = useLocation();
  console.log(location)
  const hideHeader = (location.pathname.includes('login') || location.pathname.includes('signup') || location.pathname === ('/') /* || location.pathname === ('{ADD HEROKU LINK HERE}/')*/) ? true : false

  return (
    <Box className="App" sx={{ minHeight: '100vh' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          <Sidenav />
          {!hideHeader &&
            <Header />
          }
        </header>

        <Box sx={{
          px: 2,
          mt: '61px',
          zIndex: 1,
        }}>
          <Switch>
            <Route exact path="/"><LoginSignup page={'/'} /></Route>
            <Route exact path="/new-recipe" component={NewRecipePage}></Route>
            <Route exact path="/recipe" component={ViewRecipe}></Route>
            <Route exact path="/my-kit" component={MyKit}></Route>
            <Route exact path="/login" ><LoginSignup page={'login'} /></Route>
            <Route exact path="/signup" ><LoginSignup page={'signup'} /></Route>
          </Switch>
        </Box>

        <footer>

        </footer>
      </ThemeProvider>
    </Box>
  );
}

export default App;
