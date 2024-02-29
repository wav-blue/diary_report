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
    base: "1.6rem",
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
  green: "#A5DD9B",
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
