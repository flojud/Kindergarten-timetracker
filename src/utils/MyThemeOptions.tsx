import { ThemeOptions } from '@mui/material';

export const lightThemeOptions: any = {
  palette: {
    mode: 'light',
    primary: {
      main: '#80d8ff',
      light: '#b5ffff',
      dark: '#49a7cc',
      contrastText: '#333333',
    },
    secondary: {
      main: '#ffa680',
      light: '#ffd8b0',
      contrastText: '#e8e8e8',
      dark: '#c97653',
    },
    text: {
      primary: '#333333',
      secondary: '#3f3f3f',
      disabled: '#585858',
    },
    background: {
      default: '#f5f5f5',
      paper: '#f5f5f5',
    },
    info: {
      main: '#ED7EF7',
      light: '#F7A84D',
      dark: '#A2F759',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontFamily: 'Oswald',
    },
    h2: {
      fontFamily: 'Oswald',
    },
    h3: {
      fontFamily: 'Oswald',
    },
    h4: {
      fontFamily: 'Oswald',
    },
    h5: {
      fontFamily: 'Oswald',
    },
    h6: {
      fontFamily: 'Oswald',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, rgba(255,166,128,1) 80%, rgba(255,216,176,1) 100%);',
          border: 0,
          borderRadius: 3,
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          color: 'white',
          padding: '2',
        },
      },
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#49a7cc',
      light: '#b5ffff',
      dark: '#49a7cc',
      contrastText: '#333333',
    },
    secondary: {
      main: '#ffa680',
      light: '#ffd8b0',
      contrastText: '#e8e8e8',
      dark: '#c97653',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeightLight: 100,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 15,
    h1: {
      fontFamily: 'Oswald',
    },
    h2: {
      fontFamily: 'Oswald',
    },
    h3: {
      fontFamily: 'Oswald',
    },
    h4: {
      fontFamily: 'Oswald',
    },
    h5: {
      fontFamily: 'Oswald',
    },
    h6: {
      fontFamily: 'Oswald',
    },
    subtitle1: {
      fontWeight: 200,
      lineHeight: 1.63,
    },
    caption: {
      fontWeight: 200,
      lineHeight: 1.23,
    },
  },
};
