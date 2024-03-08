const margins = {
  small: ".5rem",
  base: "1rem",
  slarge: "1.5rem",
  large: "2rem",
  xlarge: "3rem",
};

const paddings = {
  xsmall: ".12rem",
  small: ".5rem",
  base: "1rem",
  slarge: "1.5rem",
  large: "2rem",
  xlarge: "3rem",
};

const fonts = {
  family: {
    base: `'Noto Sans KR', sans-serif`,
    title: `'Merriweather', serif`,
  },
  size: {
    small: "0.8rem",
    base: "1.0rem",
    sLarge: "1.2rem",
    large: "2rem",
    xlarge: "2.5rem",
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
};

const shapes = {
  radius: {
    small: "4px",
    base: "8px",
  },
};

const colors = {
  default: "#C5EBAA",
  red: "#F2C18D",
  yellow: "#F6F193",
  lightGreen: "#E1F0DA",
  green: "#BFD8AF",
  darkGreen: "#294B29",
  white: "#F9F9F9",
  grey: "#E5E1DA",
  pureWhite: "#FFFFFF",
  beige: "#FBF9F1",
  lightYellowGreen: "#E1ECC8",
};

const defalutTheme = {
  margins,
  paddings,
  fonts,
  colors,
  shapes,
};

export const theme = {
  ...defalutTheme,
};
