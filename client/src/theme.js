import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e76f51',
      light: '#EB8B73',
      dark: '#A14D38',
      contrastText: '#f5f5f5',
    },
    secondary: {
      main: '#ffca3a',
      light: '#FFD461',
      dark: '#B28D28',
      contrastText: '#000000',
    },
    backdrop: {
      main: '#046e8f',
      light: '#368BA5',
      dark: '#024D64',
      contrastText: '#f5f5f5',
    },
    light: {
      main: '#f5f5f5',
      contrastText: '#000000'
    },
    grey: {
      main: '#e0e0e0'
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#ffca3a',
      tertiary: '#e76f51'
    },
    background: {
      default: '#022f40',
      paper: '#03435b',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
        color: 'backdrop'
      },
    },
  },
  typography: {
    fontFamily: ['Poppins'].join(','),
    button: {
      textTransform: 'none'
    }
    
  },

  
});

export default theme;