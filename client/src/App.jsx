import { useEffect, useMemo } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import Layout from "@/layouts";
import { themeSettings } from "@/theme";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "universal-cookie";

import SearchPage, { loader as SearchLoader } from "@/pages/SearchPage";
import HomePage, { loader as HomeLoader } from "@/pages/HomePage";
import AuthPage from "@/pages/AuthPage";
import FavoritesPage from "@/pages/FavoritesPage";
import MoviePage, { loader as MovieLoader } from "@/pages/MoviePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: { element: <HomePage />, loader: HomeLoader },
    children: [
      { path: "/search", element: <SearchPage />, loader: SearchLoader },
      { path: "/", element: <HomePage />, loader: HomeLoader },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/movie", element: <MoviePage />, loader: MovieLoader },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings("dark")), [mode]); // Updates the theme and makes sure only to rerender when mode changes
  const { VITE_GOOGLE_CLIENT_ID } = import.meta.env;

  const cookies = new Cookies(null, { path: "/" });
  const isAuth = useSelector((state) => state.isAuth);

  // console.log(cookies.cookies);

  useEffect(() => {
    if (isAuth) return;
    if (cookies.get("token")) {
      // console.log('first')
    }
    return () => {};
  }, []);

  return (
    <Box
      className="App"
      display="flex"
      height="100vh"
      bgcolor={"background.alt"}
      overflow="hidden"
    >
      <Formik>
        <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
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
