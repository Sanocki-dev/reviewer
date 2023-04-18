import { useMemo, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import HomePage from "@/pages/HomePage/HomePage";
import SearchPage from "@/pages/SearchPage";
import Layout from "@/layout/Layout";

import { themeSettings } from "@/theme";
import { loader as SearchLoader } from "@/pages/SearchPage";
import { loader as HomeLoader } from "@/pages/HomePage/HomePage";
import { useSelector } from "react-redux";

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
  const theme = useMemo(() => createTheme(themeSettings('dark')), [mode]); // Updates the theme and makes sure only to rerender when mode changes

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
