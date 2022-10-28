import { createTheme } from '@mui/material';

// Placeholder for the editing the entire theme
// Remove default styling for Button
export const customTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
});
