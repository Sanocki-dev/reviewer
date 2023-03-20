import React from "react";
import { Box, useTheme } from "@mui/material";

const ScrollBox = ({ sx, children }) => {
  const theme = useTheme();

  const neutralMedium = theme.palette.neutral.medium;
  
  return (
    <Box
      sx={{
        ...sx,

        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "0.3em",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: `inset 0 0 6px black`,
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: 4,
          backgroundColor: neutralMedium,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollBox;
