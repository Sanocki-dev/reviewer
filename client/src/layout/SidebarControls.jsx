import { ChevronLeft, ChevronRight, Menu } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";

const SidebarControls = ({ onClickHandler, currentState }) => {
  const mdQuery = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const Arrows = () => (
    <>
      <IconButton onClick={onClickHandler} disabled={!currentState}>
        <ChevronLeft sx={{ height: "1.75rem", width: "1.75rem" }} />
      </IconButton>
      <IconButton onClick={onClickHandler} disabled={currentState}>
        <ChevronRight sx={{ height: "1.75rem", width: "1.75rem" }} />
      </IconButton>
    </>
  );

  const Burger = () => (
    <IconButton onClick={onClickHandler}>
      <Menu />
    </IconButton>
  );

  return (
    <Box
      ml={2}
      width={mdQuery ? 110 : 150}
      sx={{ transition: "width .3s ease-in-out" }}
    >
      {mdQuery ? Burger() : Arrows()}
    </Box>
  );
};

export default SidebarControls;
