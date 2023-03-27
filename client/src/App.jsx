import { useMemo, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import Layout from "@/layout/Layout";

import { themeSettings } from "@/theme";
import { loader } from "@/pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/search*", element: <SearchPage />, loader: loader },
    ],
  },
]);

function App() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => createTheme(themeSettings("dark")), [mode]); // Updates the theme and makes sure only to rerender when mode changes

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
