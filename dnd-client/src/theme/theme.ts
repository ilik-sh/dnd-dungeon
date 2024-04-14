import { createTheme } from '@mui/material';
import { amber, blueGrey, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: amber[800],
    },
    action: {
      active: blueGrey[200],
    },
    text: {
      primary: blueGrey[100],
      secondary: blueGrey[100],
    },
    background: {
      paper: grey[900],
    },
    divider: blueGrey[100],
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: grey[600],
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:has(> input:-webkit-autofill)': {
            backgroundColor: grey[800],
          },
        },
        input: {
          '&:-webkit-autofill': {
            transition: 'background-color 600000s 0s, color 600000s 0s',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `2px solid ${grey[800]}`,
          borderRadius: '10px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[900],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: blueGrey[100],
        },
      },
    },
  },
});
