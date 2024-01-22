import { createTheme } from '@mui/material';

export const pickles = createTheme({
  palette: {
    background: {
      default: '#749877',
      paper: '#80C886',
    },
    primary: {
      main: '#56F307',
    },
    secondary: {
      main: '#C7E115',
    },
    text: {
      title: '#002E04',
      primary: '#002E04',
      disabled: '#5A8958'
    },
    warning: {
      main: '#99001a',
    },
    divider: '#1e3d10',
  },
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif',
    ].join(','),
    fontSize: 16,
  },
  spacing: 4,
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'pickled' },
          style: {
            color: '#E6E6E6',
            textTransform: 'none',
            padding: '5px',
            margin: '5px',
            background: 'linear-gradient(45deg, rgba(213, 251, 13, 0.25) 30%, rgba(133, 157, 4, 0.5) 90%)',
          }
        },
      ], //end variants
      defaultProps: {
        size: 'small'
      }
    } //end MuiButton sections

  } //End components section

})