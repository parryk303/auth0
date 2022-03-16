import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    'fontFamily': `'HandelGo','Roboto', 'Helvetica', 'Arial', sans-serif`,
    'fontSize': 14,
    'fontWeightLight': 300,
    'fontWeightRegular': 400,
    'fontWeightMedium': 500
   }
});

export default lightTheme;
