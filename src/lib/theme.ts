/**
 * Theme constants (KRR-style design system)
 */
export const THEME = {
  colors: {
    primary: {
      main: '#E53935',
      light: '#FF6B6B',
      dark: '#AB000D',
    },
    secondary: {
      main: '#1A237E',
      light: '#534AA0',
      dark: '#000051',
    },
    background: {
      default: '#0A0A0A',
      paper: '#121212',
      light: {
        default: '#F8F9FA',
        paper: '#FFFFFF',
      },
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B8C4B3',
      light: {
        primary: '#2D3436',
        secondary: '#636E72',
      },
    },
  },
  gradients: {
    text: 'linear-gradient(45deg, #D4202C 30%, #FF4B57 90%)',
    button: 'linear-gradient(45deg, #E53935 30%, #FF6B6B 90%)',
    buttonHover: 'linear-gradient(45deg, #FF6B6B 30%, #E53935 90%)',
    card: 'linear-gradient(145deg, rgba(26,26,26,0.9) 0%, rgba(20,20,20,0.8) 100%)',
    cardLight: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,249,250,0.9) 100%)',
  },
  typography: {
    fontFamily: "'Rajdhani', sans-serif",
  },
} as const;
