import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";

import NavBar from "./navbar/NavBar";
import SideBar from "./sidebar/Sidebar";
import Footer from "./components/Footer";

import { toggleSidebar } from "@/context";
import ScrollBox from "@/components/ui/ScrollBox";

const RootLayout = () => {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const dispatch = useDispatch();

  const smQuery = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const sidebarHandler = () => dispatch(toggleSidebar());

  return (
    <>
      <Box
        className="Sidebar"
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
          height: smQuery ? "100vh" : "100%",
          zIndex: 100,
          overflow: "hidden",
          borderRight: "1px solid",
          pb: 10,
          borderColor: "neutral.light",
          transition: "all 1s ease-in-out",
          position: smQuery ? "absolute" : "relative",
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
            zIndex={100}
            sx={{ transition: "bottom .87s ease-in-out" }}
            bottom={state == "entered" || state == "entering" ? 0 : 1000}
            onClick={sidebarHandler}
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
        <ScrollBox
          sx={{
            height: "100%",
            maxHeight: "calc(100% - 6rem)",
          }}
        >
          <Box component="main" px={3} pb={3}>
            <Outlet />
          </Box>
          <Footer />
        </ScrollBox>
      </Box>
    </>
  );
};

export default RootLayout;
