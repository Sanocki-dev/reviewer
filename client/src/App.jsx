import { useMemo } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Formik } from "formik";

import RootLayout from "@/new/Pages/Root";
import { themeSettings } from "@/theme";

import { GoogleOAuthProvider } from "@react-oauth/google";

import HomePage, { loader as HomeLoader } from "@/new/pages/Home";
import SearchPage, { loader as SearchLoader } from "@/pages/SearchPage";
import BrowsePage, { loader as BrowseLoader } from "@/pages/BrowsePage";

import AuthPage from "@/pages/AuthPage";
import FavoritesPage from "@/pages/FavoritesPage";
import MoviePage, { loader as MovieLoader } from "@/pages/MoviePage";
import { tokenLoader, checkAuthLoader } from "@/utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    // errorElement: { element: <HomePage />, loader: HomeLoader },
    children: [
      { path: "/", element: <HomePage />, loader: HomeLoader },
      //   { path: "/browse", element: <BrowsePage />, loader: BrowseLoader },
      //   { path: "/search", element: <SearchPage />, loader: SearchLoader },
      //   {
      //     path: "/favorites",
      //     element: <FavoritesPage />,
      //     loader: checkAuthLoader,
      //   },
      //   { path: "/movie", element: <MoviePage />, loader: MovieLoader },
      //   { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // Updates the theme and makes sure only to rerender when mode changes

  return (
    <Box
      className="App"
      display="flex"
      sx={{
        overflowX: "hidden",
        bgcolor: "Background.main",
        minHeight: "100vh",
      }}
    >
      <Formik>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
            <AuthPage />
          </ThemeProvider>
        </GoogleOAuthProvider>
      </Formik>
    </Box>
  );
}

export default App;
