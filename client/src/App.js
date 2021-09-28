import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// Themes....
import './App.scss';
import theme from './theme.js'

// React Router Pages....
import NewRecipe from './pages/NewRecipe';
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
  const hideHeader = (location.pathname.includes('login') || location.pathname.includes('signup')) ? true : false

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          {/* <Sidenav/> */}
          {!hideHeader && 
            <Header />
          }
        </header>
        <main>
          <Box paddingX={{ xs: 2, md: 6, lg: 15, xl: 20}}sx={{
            // px: 2,
            mt: '61px',
            zIndex: 1,
          }}>
            <Switch>
              <Route exact path="/new-recipe" component={NewRecipe}></Route>
              <Route exact path="/recipe" component={ViewRecipe}></Route>
              <Route exact path="/my-kit" component={MyKit}></Route>
              <Route exact path="/login" ><LoginSignup page={'login'} /></Route>
              <Route exact path="/signup" ><LoginSignup page={'signup'} /></Route>
            </Switch>
          </Box>
        </main>
        <footer>

        </footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
