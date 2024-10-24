// color design tokens export
export const colorTokens = {
  grey: {
    0: '#FFFFFF',
    10: '#F6F6F6',
    50: '#F0F0F0',
    100: '#E0E0E0',
    200: '#C2C2C2',
    300: '#A3A3A3',
    400: '#858585',
    500: '#666666',
    600: '#4D4D4D',
    700: '#333333',
    800: '#1A1A1A',
    900: '#0A0A0A',
    1000: '#000000',
  },
  primary: {
    50: '#E6FBFF',
    100: '#CCF7FE',
    200: '#99EEFD',
    300: '#66E6FC',
    400: '#33DDFB',
    500: '#00D5FA',
    600: '#00A0BC',
    700: '#006B7D',
    800: '#00353F',
    900: '#001519',
  },
  chatLight: {
    1: '#00a0bc',
    2: '#00d5fa',
    3: '#A0DEFF',
    4: '#333333',
    5: '#666666',
    6: '#a3a3a3',
    7: '#858585',
    8: '#f0f0f0',
    9: ' #ffffff',
    10: '#f6f6f6',
    11: '#333333',
    12: '#666666',
    13: 'rgb(55, 151, 240)',
    14: 'rgb(239, 239, 239)',
    15: ' #fff',
    16: '#4a5568',
  },

  chatDark: {
    1: '#007a94',
    2: '#1d8491',
    3: '#004f6a',
    4: '#ffffff',
    5: '#cccccc',
    6: '#999999',
    7: '#b3b3b3',
    8: '#4d4d4d',
    9: '#1e1e1e',
    10: '#2e2e2e',
    11: '#ffffff',
    12: '#4d4d4d',
    13: 'rgb(55, 151, 240)',
    14: 'rgb(50, 50, 50)',
    15: '#000',
    16: '#4a5568',
  },
}

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.chatDark[1],
              main: colorTokens.chatDark[2],
              light: colorTokens.chatDark[3],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.chatLight[1],
              main: colorTokens.chatLight[2],
              light: colorTokens.chatLight[3],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    palettee: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.chatDark[2],
              alt: colorTokens.chatDark[10],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.chatLight[2],
              alt: colorTokens.chatLight[10],
            },
          }),
    },
    typography: {
      fontFamily: ['Rubik', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  }
}
