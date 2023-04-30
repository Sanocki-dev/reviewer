import { Box, Tooltip, CircularProgress, Typography } from "@mui/material";

const ScoreCircle = ({ isPlaced, total, score, sx, size = 50 }) => {
  if (score == 0) return;

  let green = 235;
  let red = 235;

  score < 5 ? (red = score * 36.6) : (green = 255 - (score - 5) * 36.6);

  return (
    <Box
      position={isPlaced ? "relative" : "absolute"}
      sx={{
        zIndex: 1,
        bgcolor: `rgb(${green - 150},${red - 150},40)`,
        overflow: "hidden",
        borderRadius: "50%",
        p:.51,
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
          thickness={3}
          size={size - 5}
          title={score}
          sx={{
            color: `rgb(${green},${red},52)`,
            strokeLinecap: "round",
          }}
          value={score * 10}
        />

        <Tooltip
          title={score == 0 ? "Not yet rated!" : total + " total votes."}
        >
          <Typography position={"absolute"} color='white' variant="subtitle1">
            {Math.round(score * 10)}
            <Typography variant="caption">%</Typography>
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ScoreCircle;
