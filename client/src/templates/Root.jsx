import { Box, Stack, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "@/organisms/Navbar/Header";
import Footer from "@/organisms/Footer/Footer";
import { dark, light } from "@/assets/background";


const RootLayout = () => {
  const { palette } = useTheme();
  const bg = palette.mode === "dark" ? dark : light;

  return (
    <Stack width={1}>
      <Header />
      <Box sx={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
};

export default RootLayout;
