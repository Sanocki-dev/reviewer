import { Box, Tooltip, Typography } from "@mui/material";

const IMDBRating = ({ score, total, isPlaced, sx }) => {
  return (
    <Tooltip title={`${total} total votes.`}>
      <Box
        sx={{
          position: !isPlaced && "absolute",
          top: !isPlaced && 10,
          left: !isPlaced && 20,
          bgcolor: "#fed644",
          p: 1,
          borderRadius: 3,
          ...sx
        }}
      >
        <Typography
          fontWeight={600}
          variant="subtitle2"
          pt={"2px"}
          px={1}
          color={"#150c00"}
        >
          IMDB {score?.toString().slice(0, 3)}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default IMDBRating;
