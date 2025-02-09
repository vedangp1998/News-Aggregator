import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Dark theme
    primary: {
      main: "#1976d2", // Primary color
    },
    secondary: {
      main: "#dc004e", // Secondary color
    },
    background: {
      default: "linear-gradient(135deg, #141e30, #243b55)", // Gradient background
      paper: "#1e293b", // Card background color
    },
    text: {
      primary: "#ffffff", // Primary text color
      secondary: "#b0bec5", // Secondary text color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Custom font
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
  },
});

export default theme;
