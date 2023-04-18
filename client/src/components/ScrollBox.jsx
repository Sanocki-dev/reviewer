import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";

const ScrollBox = (props) => {
  const { sx, children, horizontal, ...others } = props;

  const scroller = useRef();

  const handleHorizontalScroll = (e) => {
    if (!horizontal) return;
    e.preventDefault();
    scroller.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    if (scroller.current)
      scroller.current.addEventListener("wheel", handleHorizontalScroll);
    return () => {
      if (scroller.current)
        scroller.current.removeEventListener("wheel", handleHorizontalScroll);
    };
  }, [scroller]);

  return (
    <Box
      ref={scroller}
      sx={{
        overflowY: "auto",
        overflowX: horizontal && "auto",
        "&::-webkit-scrollbar": {
          width: "0.3em",
          height: "0.3em",
          display: horizontal && "none",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: `inset 0 0 6px black`,
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: 4,
          backgroundColor: "neutral.medium",
        },
        ...sx,
      }}
      {...others}
    >
      {children}
    </Box>
  );
};

export default ScrollBox;
