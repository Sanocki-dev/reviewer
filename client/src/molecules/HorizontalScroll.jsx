import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useRef } from "react";

const HorizontalScroll = ({ children, width, scroll = 5, sx }) => {
  const ref = useRef();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const onClickHandler = (direction) => {
    let current = ref.current.scrollLeft;
    ref.current.scrollTo({
      left: current + (isMobile ? width * 3 : width * scroll) * direction,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        position: "relative",
        pb: 4,
        ...sx,
      }}
    >
      <Button
        variant={"contained"}
        sx={{
          height: 50,
          left: 0,
          width: "35%",
          minWidth: 5,
          position: "absolute",
          bottom: 0,
          zIndex: 1,
        }}
        onClick={() => onClickHandler(-1)}
      >
        <ChevronLeft sx={{ transform: "scale(1.8)" }} />
      </Button>
      <Box
        ref={ref}
        sx={{
          display: "flex",
          overflowX: "scroll",
        }}
      >
        {children}
      </Box>
      <Button
        variant={"contained"}
        sx={{
          height: 50,
          width: "35%",
          minWidth: 5,
          right: 0,
          bottom: 0,
          position: "absolute",
          zIndex: 1,
        }}
        onClick={() => onClickHandler(1)}
      >
        <ChevronRight sx={{ transform: "scale(1.8)" }} />
      </Button>
    </Box>
  );
};

export default HorizontalScroll;
