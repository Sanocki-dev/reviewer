import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <Stack width={1}>
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default RootLayout;
