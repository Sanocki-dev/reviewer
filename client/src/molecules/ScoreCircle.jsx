import { Box, CircularProgress, Typography } from "@mui/material";

const ScoreCircle = ({ score, children }) => {
  let color = score * 0.1;
  let green = 235;
  let red = 235;

  color < 5 ? (red = color * 36.6) : (green = 255 - (color - 5) * 36.6);

  if (score > 100) {
    green = 255;
    red = 0;
  }

  return (
    <Box
      sx={{
        width: 90,
        height: 90,
        mx: 2,
        my: "auto",
        bgcolor: `rgb(${green - 150},${red - 150},${score > 100 ? 200 : 40})`,
        overflow: "hidden",
        borderRadius: "50%",
      }}
      position={"relative"}
      display="flex"
      alignItems={"center"}
      justifyContent="center"
    >
      <CircularProgress
        variant="determinate"
        thickness={3}
        size={80}
        sx={{
          color: `rgb(${green - 100},${red - 100},25)`,
          strokeLinecap: "round",
        }}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        thickness={3}
        title={score}
        size={80}
        sx={{
          color: `rgb(${green},${red},${score > 100 ? 255 : 52})`,
          strokeLinecap: "round",
          position: "absolute",
        }}
        value={score > 100 ? 100 : score}
      />

      {children ? children : <Text score={score} />}
    </Box>
  );
};

export default ScoreCircle;

const Text = ({ score }) => (
  <Typography
    sx={{
      position: "absolute",
      fontWeight: "bold",
      color: "white",
    }}
    variant="h2"
  >
    {Math.round(score)}
    <Typography variant="caption" fontSize={15}>
      %
    </Typography>
  </Typography>
);
