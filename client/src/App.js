import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Themes....
import theme from './theme.js'
import './App.scss';

// React Router Pages....
import NewRecipe from './pages/NewRecipe';

// Components....
import Header from './components/Header'
import Sidenav from "./components/Sidenav";
import { Box, ThemeProvider } from '@mui/system';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header>
          {/* <Sidenav/> */}
          <Header></Header>
        </header>
        <main>
          <Box sx={{
            paddingLeft: '1em',
            paddingRight: '1em',
          }}>
              <Switch>
                <Route exact path="/new-recipe" component={NewRecipe}></Route>
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
