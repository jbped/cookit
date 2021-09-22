import React from 'react';
import './App.css';
import Sidenav from "./components/Sidenav";
import { ThemeProvider } from '@mui/styles';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
      <Sidenav/>
     
      </ThemeProvider>
    </div>
  );
}

export default App;
