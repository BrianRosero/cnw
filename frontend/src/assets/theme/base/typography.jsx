// Soft UI Dashboard PRO React Base Styles
import colors from '../base/colors';

// Soft UI Dashboard PRO React Helper Functions
import pxToRem from '../functions/pxToRem';

const { dark, light } = colors;

const baseProperties = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontSizeXXS: '0.75rem',
  fontSizeXS: '0.75rem',
  fontSizeSM: '0.75rem',
  fontSizeMD: '0.75rem',
  fontSizeLG: '0.75rem',
  fontSizeXL: '0.875rem',
};

const baseHeadingProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightMedium,
};

const baseDisplayProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightLight,
  lineHeight: 1.2,
};

const typography = {
  fontFamily: baseProperties.fontFamily,
  fontWeightLight: baseProperties.fontWeightLight,
  fontWeightRegular: baseProperties.fontWeightRegular,
  fontWeightMedium: baseProperties.fontWeightMedium,
  fontWeightBold: baseProperties.fontWeightBold,

  h1: {
    fontSize: '2.125rem',
    lineHeight: 1.25,
    ...baseHeadingProperties,
    fontWeight: 700,
  },

  h2: {
    fontSize: '1.5rem',
    lineHeight: 1.3,
    ...baseHeadingProperties,
    fontWeight: 700,
  },

  h3: {
    fontSize: '1.25rem',
    lineHeight: 1.375,
    ...baseHeadingProperties,
    fontWeight: 600,
  },

  h4: {
    fontSize: '1rem',
    lineHeight: 1.375,
    ...baseHeadingProperties,
    fontWeight: 600,
  },

  h5: {
    fontSize: '0.875rem',
    lineHeight: 1.375,
    ...baseHeadingProperties,
    fontWeight: 500,
  },

  h6: {
    fontSize: '0.75rem',
    lineHeight: 1.625,
    ...baseHeadingProperties,
    fontWeight: 500,
  },

  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: dark.textDark,
  },

  subtitle2: {
    fontSize: '0.75rem',
    fontWeight: 400,
    color: dark.textSecondary,
  },

  body1: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.334em',
  },

  body2: {
    letterSpacing: '0em',
    fontWeight: 400,
    lineHeight: '1.5em',
    color: dark.textPrimary,
  },
  button: {
    textTransform: 'capitalize',
  },

  caption: {
    fontSize: '0.75rem',
    color: dark.textSecondary,
    fontWeight: 400,
  },

  overline: {
    fontFamily: baseProperties.fontFamily,
  },

  d1: {
    fontSize: pxToRem(80),
    ...baseDisplayProperties,
  },

  d2: {
    fontSize: pxToRem(72),
    ...baseDisplayProperties,
  },

  d3: {
    fontSize: pxToRem(64),
    ...baseDisplayProperties,
  },

  d4: {
    fontSize: pxToRem(56),
    ...baseDisplayProperties,
  },

  d5: {
    fontSize: pxToRem(48),
    ...baseDisplayProperties,
  },

  d6: {
    fontSize: pxToRem(40),
    ...baseDisplayProperties,
  },

  size: {
    xxs: baseProperties.fontSizeXXS,
    xs: baseProperties.fontSizeXS,
    sm: baseProperties.fontSizeSM,
    md: baseProperties.fontSizeMD,
    lg: baseProperties.fontSizeLG,
    xl: baseProperties.fontSizeXL,
  },

  lineHeight: {
    sm: 1.25,
    md: 1.5,
    lg: 2,
  },

  // Additional typography settings from themeTypography
  customInput: {
    marginTop: 1,
    marginBottom: 1,
    '& > label': {
      top: 23,
      left: 0,
      color: dark.grey500,
      '&[data-shrink="false"]': {
        top: 5,
      },
    },
    '& > div > input': {
      padding: '30.5px 14px 11.5px !important',
    },
    '& legend': {
      display: 'none',
    },
    '& fieldset': {
      top: 0,
    },
  },

  mainContent: {
    backgroundColor: dark.background,
    width: '100%',
    minHeight: 'calc(100vh - 88px)',
    flexGrow: 1,
    padding: '20px',
    marginTop: '88px',
    marginRight: '20px',
    borderRadius: `${dark.borderRadius}px`,
  },

  menuCaption: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: dark.heading,
    padding: '6px',
    textTransform: 'capitalize',
    marginTop: '10px',
  },

  subMenuCaption: {
    fontSize: '0.6875rem',
    fontWeight: 500,
    color: dark.darkTextSecondary,
    textTransform: 'capitalize',
  },

  commonAvatar: {
    cursor: 'pointer',
    borderRadius: '8px',
  },

  smallAvatar: {
    width: '22px',
    height: '22px',
    fontSize: '1rem',
  },

  mediumAvatar: {
    width: '34px',
    height: '34px',
    fontSize: '1.2rem',
  },

  largeAvatar: {
    width: '44px',
    height: '44px',
    fontSize: '1.5rem',
  },

};

export default typography;
