// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#161616",
    800: "#0f0f0f",
    900: "#0A0A0A",
    1000: "#000000",
  },
  background: {
    50: "#E0E1DD",
    100: "#778DA9",
    200: "#415A77",
    300: "#1B263B",
    400: "#0D1B2A",
  },
  primary: {
    50: "#CAF0F8",
    100: "#ADE8F4",
    200: "#90E0EF",
    300: "#48CAE4",
    400: "#00B4D8",
    500: "#0096C7",
    600: "#0077B6",
    700: "#023E8A",
    800: "#03045E",
    900: "#001519",
  },
  secondary: {
    50: "#FFFF3F",
    100: "#EEEF20",
    200: "#DDDF00",
    300: "#D4D700",
    400: "#BFD200",
    500: "#AACC00",
    600: "#80B918",
    700: "#55A630",
    800: "#2B9348",
    900: "#007F5F",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              600: colorTokens.primary[600],
              900: colorTokens.primary[900],
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
              light: colorTokens.background[200],
              default: colorTokens.background[300],
              alt: colorTokens.background[400],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              600: colorTokens.primary[300],
              900: colorTokens.primary[200],
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
              light: colorTokens.grey[10],
              default: colorTokens.grey[50],
              alt: colorTokens.grey[100],
            },
          }),
      secondary: {
        dark: colorTokens.secondary[200],
        main: colorTokens.secondary[500],
        light: colorTokens.secondary[800],
      },
    },
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
