import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/system";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import Layout from "@/layout/Layout";

import { themeSettings } from "@/theme";

function App() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => createTheme(themeSettings("dark")), [mode]); // Updates the theme and makes sure only to rerender when mode changes

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search*" element={<SearchPage />} />
              <Route path="/comingsoon" element={<HomePage />} />
              <Route path="/watchlist" element={<HomePage />} />
              <Route path="/:id" element={<HomePage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
