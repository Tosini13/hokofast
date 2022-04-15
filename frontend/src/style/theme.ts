import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    value: {
      normal: string;
      high: string;
      highest: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    value?: {
      normal?: string;
      high?: string;
      highest?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#313D56",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#F0DE4F",
      contrastText: "#313D56",
    },
    text: {
      primary: "#313D56",
      secondary: "#939393",
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
  value: {
    normal: "green",
    high: "yellow",
    highest: "red",
  },
});
