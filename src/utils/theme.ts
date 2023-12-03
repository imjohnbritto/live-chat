import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const COLORS = {
  PRIMARY: '#FCC017',
  SECONDARY: '#2D47A1',
  WHITE: '#FFFFFF',
  GREY: '#808080',
  BLACK: '#000000',
  LIGHT_GREY: '#E3E4E5',
  BACKGROUND: '#F1F1F1',
  TEXT1: '#2E2F32',
  TEXT2: '#46474A',
  TEXT3: '#74767C',
  DISABLED: '#BABBBE',
  ERROR: '#DE1C24',
  INFO: '#0071DC',
  DARK_RED: '#9B1419',
  LIGHT_RED: '#f8d2d3',
  SUCCESS: '#2A8703',
  LIGHT_GREEN: '#F4F9F2',
  YELLOW: '#FFC220',
  LIGHT_YELLOW: '#FFF3D2'
};

export const DEVICE = {
  MOBILE: '480px'
};

export const theme = responsiveFontSizes(
  createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 320,
        md: 640,
        lg: 1024,
        xl: 1200
      }
    },
    palette: {
      primary: {
        main: COLORS.PRIMARY
      },
      secondary: {
        main: COLORS.SECONDARY
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: ({ ownerState }) => ({
            textTransform: 'none',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            borderRadius: '100px',
            ...(ownerState.variant === 'outlined' && {
              color: COLORS.TEXT1,
              border: `1px solid ${COLORS.TEXT1}`,
              '&:hover': {
                border: `2px solid ${COLORS.TEXT1}`,
                backgroundColor: COLORS.WHITE
              }
            }),
            ...(ownerState.variant === 'text' && {
              color: COLORS.SECONDARY,
              '&:hover': {
                backgroundColor: COLORS.WHITE
              }
            })
          })
        }
      }
    }
  })
);
