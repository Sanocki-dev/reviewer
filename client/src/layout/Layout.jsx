import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";

import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
              ? "80%"
              : isSidebarOpen
              ? 300
              : smQuery
              ? 0
              : 100,
          bgcolor:'background.alt',
          height:'100%',
          zIndex:1,
          transition: "all 1s ease-in-out",
          position:smQuery && 'absolute',
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
          opacity: isSidebarOpen && smQuery ? 0.25 : 1,
          transition: "opacity .3s ease-in-out",
          pointerEvents: isSidebarOpen && smQuery && "none",
        }}
      >
        <NavBar sidebarHandler={sidebarHandler} currentState={isSidebarOpen} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
