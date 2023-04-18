import { ChevronLeft, ChevronRight, Menu } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { toggleSidebar } from "@/store";

const SidebarControls = () => {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const dispatch = useDispatch();
  const mdQuery = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const onClickHandler = () => dispatch(toggleSidebar());

  const Arrows = () => (
    <>
      <IconButton onClick={onClickHandler} disabled={!isSidebarOpen}>
        <ChevronLeft sx={{ height: "1.75rem", width: "1.75rem" }} />
      </IconButton>
      <IconButton onClick={onClickHandler} disabled={isSidebarOpen}>
        <ChevronRight sx={{ height: "1.75rem", width: "1.75rem" }} />
      </IconButton>
    </>
  );

  return (
    <Box ml={2} width={75} sx={{ transition: "width .3s ease-in-out" }}>
      <IconButton onClick={onClickHandler}>
        <Menu />
      </IconButton>

      {/* {mdQuery ? Burger() : Arrows()} */}
    </Box>
  );
};

export default SidebarControls;
