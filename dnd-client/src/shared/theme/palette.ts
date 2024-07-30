import { alpha } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    landing: Palette['primary'];
  }
  interface PaletteOptions {
    landing: PaletteOptions['primary'];
  }
}

export const primary = {
  light: '#F68C00',
  main: '#FF9100',
  dark: '#B36500',
  contrastText: '#030303',
};

export const secondary = {
  light: '#00A4FF',
  main: '#3982AA',
  dark: '#394B55',
  contrastText: '#130C01',
};

export const landing = {
  main: '#101113',
};

export const action = {
  active: blueGrey[200],
};

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

const base = {
  primary,
  secondary,
  landing,
  action,
  common,
  divider: alpha(grey[700], 0.2),
};

export function palette() {
  return {
    ...base,
    text: {
      primary: grey[100],
      secondary: grey[300],
      disabled: grey[500],
    },
    background: {
      paper: grey[900],
    },
  };
}
