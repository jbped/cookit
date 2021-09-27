import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Themes....
import './App.scss';
import theme from './theme.js'

// React Router Pages....
import NewRecipe from './pages/NewRecipe';

// Components....
import { Box, ThemeProvider } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header'
import Sidenav from "./components/Sidenav";
import RecipeCard from "./components/RecipeCard";
import RecipeListItem from "./components/RecipeListItem";
import MyKit from "./pages/MyKit";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          <Sidenav/>
          <Header></Header>
        </header>
        <main>
          <Box sx={{
            px:2,
            mt: '61px',
            zIndex: 1,
          }}>
              <Switch>
                <Route exact path="/new-recipe" component={NewRecipe}></Route>
            </Switch>
            {/* <MyKit/> */}
          </Box>
        </main>
        <footer>

        </footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
