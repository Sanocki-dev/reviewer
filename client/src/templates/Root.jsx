import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "@/organisms/Navbar/Header";
import Footer from "@/organisms/Footer/Footer";

const RootLayout = () => {
  return (
    <Stack width={1}>
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.main",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
};

export default RootLayout;
