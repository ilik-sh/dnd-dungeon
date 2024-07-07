import { Theme } from '@mui/material';

import { primary } from './palette';

export function overrides(theme: Theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',

          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.grey[900],
          },
          '&::-webkit-scrollbar': {
            width: '0.5vw',
          },
          '&::-webkit-scrollbar-thumbr': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '10px',
          },
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          background: theme.palette.landing.main,
          fontFamily:
            '-apple-system BlinkMacSystemFont Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue sans-serif',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiMenuItem-root': {
            fontSize: '14px',
            '& .MuiSvgIcon-root': {
              fontSize: '14px',
              color: theme.palette.text.primary,
              marginRight: theme.spacing(1.5),
            },
          },
        },
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        loadingIndicator: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: theme.palette.grey[800],
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:has(> input:-webkit-autofill)': {
            backgroundColor: theme.palette.grey[800],
          },
        },
        input: {
          '&:-webkit-autofill': {
            transition: 'background-color 600000s 0s, color 600000s 0s',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          color: theme.palette.grey[200],
        },
        body2: {
          color: theme.palette.grey[300],
        },
        h6: {
          color: theme.palette.grey[50],
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `2px solid ${theme.palette.grey[800]}`,
          borderRadius: '10px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[100],
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[100],
          fontSize: '5px',
        },
        primary: {
          fontSize: '11px',
          fontWeight: '600',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '5px',
        },
      },
    },
  };
}
