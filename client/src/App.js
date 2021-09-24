import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



// React Router Pages....
import NewRecipe from './pages/NewRecipe';
import './App.css';
import Sidenav from "./components/Sidenav";
import { ThemeProvider } from '@mui/styles';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Router>
        <header>
          <Sidenav/>
        </header>
        <main>
          <Switch>
            
          </Switch>

        </main>
        <footer>

        </footer>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
