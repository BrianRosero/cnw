export default function themePalette(theme = {}) {
  const colors = theme.colors || {};
  const dark = colors.dark || {};
  const grey = colors.grey || {};
  const primary = colors.primary || {};
  const secondary = colors.secondary || {};
  const error = colors.error || {};
  const orange = colors.orange || {};
  const warning = colors.warning || {};
  const success = colors.success || {};

  return {
    mode: theme?.customization?.navType || 'light',
    common: {
      black: dark.paper || '#000',
    },
    primary: {
      light: primary.light || '#e3f2fd',
      main: primary.main || '#2196f3',
      dark: primary.dark || '#1e88e5',
      200: primary[200] || '#90caf9',
      800: primary[800] || '#1565c0',
    },
    secondary: {
      light: secondary.light || '#f3e5f5',
      main: secondary.main || '#9c27b0',
      dark: secondary.dark || '#7b1fa2',
      200: secondary[200] || '#ce93d8',
      800: secondary[800] || '#4a148c',
    },
    error: {
      light: error.light || '#e57373',
      main: error.main || '#f44336',
      dark: error.dark || '#d32f2f',
    },
    orange: {
      light: orange.light || '#ffccbc',
      main: orange.main || '#ff5722',
      dark: orange.dark || '#e64a19',
    },
    warning: {
      light: warning.light || '#ffe082',
      main: warning.main || '#ffc107',
      dark: warning.dark || '#ffa000',
    },
    success: {
      light: success.light || '#b9f6ca',
      200: success[200] || '#69f0ae',
      main: success.main || '#00e676',
      dark: success.dark || '#00c853',
    },
    grey: {
      50: grey[50] || '#fafafa',
      100: grey[100] || '#f5f5f5',
      500: theme.darkText?.secondary || '#9e9e9e',
      600: theme.heading || '#757575',
      700: theme.darkText?.primary || '#616161',
      900: theme.text?.dark || '#212121',
    },
    dark: {
      light: theme.colors?.darkTextPrimary || '#ffffff',
      main: dark.level1 || '#424242',
      dark: dark.level2 || '#303030',
      800: dark.background || '#212121',
      900: dark.paper || '#121212',
    },
    text: {
      primary: theme.darkText?.primary || '#000000',
      secondary: theme.darkText?.secondary || '#757575',
      dark: theme.text?.dark || '#212121',
      hint: grey[100] || '#f5f5f5',
    },
    background: {
      paper: theme.paper || '#ffffff',
      default: theme.background?.default || '#fafafa',
    },
  };
}
