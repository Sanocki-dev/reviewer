import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";

import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/Sidebar";
import { toggleSidebar } from "@/store";

const Layout = () => {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const dispatch = useDispatch();
  const theme = useTheme();
  const smQuery = useMediaQuery(theme.breakpoints.down("sm"));

  const sidebarHandler = () => dispatch(toggleSidebar());

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
          bgcolor: "background.alt",
          height: "100%",
          zIndex: 1,
          transition: "all 1s ease-in-out",
          position: smQuery && "absolute",
          overflow: "hidden",
        }}
      >
        <SideBar
          isOpen={isSidebarOpen}
          onClick={sidebarHandler}
          isMobile={smQuery}
        />
      </Box>
      <Transition
        in={Boolean(smQuery && isSidebarOpen)}
        timeout={800}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <Box
            height="100%"
            width="20%"
            bgcolor={"primary.main"}
            position="absolute"
            right={0}
            zIndex={1}
            sx={{ transition: "bottom .87s ease-in-out" }}
            bottom={state == "entered" || state == "entering" ? 0 : 1000}
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          />
        )}
      </Transition>
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
        <NavBar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
