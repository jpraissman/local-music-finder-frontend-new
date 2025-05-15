"use client";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8d8178", // Beige/brown color from logo
    },
    secondary: {
      main: "#f5a172", // Orange/peach color from drumsticks
    },
  },
});

export default function ThemeWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
