import { createTheme } from "@mui/material";
import { amber, blueGrey, grey, purple, red } from "@mui/material/colors";

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
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: grey[600],
        },
      },
    },
  },
});
