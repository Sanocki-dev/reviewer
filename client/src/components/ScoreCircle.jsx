import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import React from "react";

const ScoreCircle = ({ isPlaced, total, score, sx, size = 50 }) => {
  let green = 235;
  let red = 235;

  score < 5 ? (red = score * 36.6) : (green = 255 - (score - 5) * 36.6);

  const scoreText = score === 0 ? "N/R" : score?.toString().slice(0, 4);

  return (
    <Box
      position={isPlaced ? "relative" : "absolute"}
      sx={{
        zIndex: 1,
        backdropFilter: "blur(4px) grayscale(1)",
        overflow: "hidden",
        borderRadius: 10,
        ...sx,
      }}
    >
      <Box
        position={"relative"}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
      >
        <CircularProgress
          variant="determinate"
          thickness={5}
          size={size}
          title={score}
          sx={{
            color: `rgb(${green},${red},52)`,
          }}
          value={score * 10}
        />
        <Tooltip title={score === 0 ? "Not yet rated!" : total + " total votes."}>
          <Typography position={"absolute"} variant="caption2">
            {scoreText}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ScoreCircle;
