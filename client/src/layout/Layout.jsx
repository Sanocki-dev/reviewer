import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = useTheme();
  const smQuery = useMediaQuery(theme.breakpoints.down("sm"));

  const sidebarHandler = () => setIsSidebarOpen((state) => !state);

  return (
    <Box
      display="flex"
      height="100vh"
      bgcolor={"background.alt"}
      overflow="hidden"
    >
      <Box
        sx={{
          width:
            isSidebarOpen && smQuery
              ? "100%"
              : isSidebarOpen
              ? 300
              : smQuery
              ? 0
              : 100,
          transition: "all 1s ease-in-out",
          overflow: "hidden",
        }}
      >
        <SideBar
          isOpen={isSidebarOpen}
          onClick={sidebarHandler}
          isMobile={smQuery}
        />
      </Box>
      <Box
        maxHeight={"100%"}
        flex={1}
        sx={{
          width: 0,
          overflow: "hidden",
          opacity: isSidebarOpen && smQuery ? 0 : 1,
          transition: "opacity .3s ease-in-out",
        }}
      >
        <NavBar sidebarHandler={sidebarHandler} currentState={isSidebarOpen} />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
