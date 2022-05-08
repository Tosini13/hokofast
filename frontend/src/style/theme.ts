import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    media: {
      facebook: {
        color: string;
        contrastText: string;
      };
      google: {
        color: string;
        contrastText: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    media?: {
      facebook: {
        color: string;
        contrastText: string;
      };
      google: {
        color: string;
        contrastText: string;
      };
    };
  }
}

// #F0DE4F - yellow
export const theme = createTheme({
  palette: {
    primary: {
      main: "#313D56", //blue
      contrastText: "#FAFAFA", //white
    },
    secondary: {
      main: "#313D56",
      contrastText: "#FAFAFA",
    },
    text: {
      primary: "#313D56",
      secondary: "#939393", // gray
    },
    success: {
      main: "#2D6B5F",
    },
    warning: {
      main: "#C3AA27",
    },
    error: {
      main: "#8D0B0B",
    },
  },
  typography: {
    fontFamily: ["Content", "Open Sans", "sans-serif"].join(","),
    h4: {
      fontFamily: ["Content", "Raleway", "sans-serif"].join(","),
    },
    h5: {
      fontFamily: ["Content", "Raleway", "sans-serif"].join(","),
    },
  },
  media: {
    facebook: { color: "#01579B", contrastText: "#FAFAFA" },
    google: { color: "#FAFAFA", contrastText: "#313D56" },
  },
});
