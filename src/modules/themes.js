import { createTheme } from '@mui/material/styles';

export const pickles = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffeb3b',
      contrastText: 'rgba(181,181,181,0.87)',
    },
    secondary: {
      main: '#ffa000',
      contrastText: '#ffadad',
    },
    text: {
      primary: '#000000',
      secondary: '#223f20',
      disabled: '#b1b1b1',
    },
    background: {
      default: 'rgb(130, 159, 144)',
      paper: '#4d796b',
    },
    error: {
      main: '#0088ad',
    },
    warning: {
      main: '#d50000',
    },
    info: {
      main: '#ffab00',
    },
    success: {
      main: '#69f0ae',
    },
    divider: '#1e3d10',
  },
  typography: {
    fontFamily: 'Open Sans',
  },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //       border: 0,
    //       borderRadius: 3,
    //       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    //       color: 'white',
    //       height: 48,
    //       padding: '0 30px',
    //     },
    //   },
    // },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '12px',
          
        }
      }
    }
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiTooltip: {
      arrow: true,
    },
  },
  spacing: 8,
});