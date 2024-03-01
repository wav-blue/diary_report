const margins = {
  small: ".5rem",
  base: "1rem",
  large: "2rem",
  xlarge: "3rem",
};

const paddings = {
  small: ".5rem",
  base: "1rem",
  large: "2rem",
  xlarge: "3rem",
};

const fonts = {
  family: {
    base: `'Noto Sans KR', sans-serif`,
    title: `'Merriweather', serif`,
  },
  size: {
    small: "1.4rem",
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
};

const defalutTheme = {
  margins,
  paddings,
  fonts,
  colors,
};

export const theme = {
  ...defalutTheme,
};
