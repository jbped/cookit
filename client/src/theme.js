import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(',')
  },
  palette: {
    primary: {
      main: '#000000'
    },
    grey: {
      main: '#e0e0e0'
    }
  }
})

export default theme;