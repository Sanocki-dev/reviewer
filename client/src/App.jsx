import { useMemo, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import Layout from "@/layouts";
import { themeSettings } from "@/theme";

import HomePage, { loader as HomeLoader } from "@/pages/HomePage";
import SearchPage, { loader as SearchLoader } from "@/pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: { element: <HomePage />, loader: HomeLoader },
    children: [
      { path: "/search*", element: <SearchPage />, loader: SearchLoader },
      { path: "/", element: <HomePage />, loader: HomeLoader },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings("dark")), [mode]); // Updates the theme and makes sure only to rerender when mode changes

  return (
    <Box
      className="App"
      display="flex"
      height="100vh"
      bgcolor={"background.alt"}
      overflow="hidden"
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Box>
  );
}

export default App;
