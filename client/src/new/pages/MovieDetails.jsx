import { Box, Link, Typography } from "@mui/material";
import { useState } from "react";

import GenreChips from "./GenreChips";

const MovieDetails = ({ movie }) => {
  const [flip, setFlip] = useState(true);

  const triggerFlip = () => {
    setFlip((state) => !state);
  };

  console.log(movie)
  const url = "https://image.tmdb.org/t/p/w1280";

  return (
    <Box
      sx={{
        cursor: "pointer",
        width: 200,
        height: 300,
        transform: flip ? "transform: rotateY(0deg);" : "rotateY(180deg)",
        perspective: "1000px",
        transformStyle: "preserve-3d",
        transition: "transform 1s",
        position: "relative",
      }}
      onClick={triggerFlip}
    >
      <Box
        sx={{
          borderRadius: 2,
          position: "absolute",
          backfaceVisibility: "hidden",
          width: 1,
          height: 1,
          backgroundImage: `url(${url}${movie.poster_path})`,
          backgroundSize: "contain",
        }}
      />
      <Box
        sx={{
          borderRadius: 2,
          backfaceVisibility: "hidden",
          display: "flex",
          gap: 2,
          flexDirection: "column",
          position: "absolute",
          transform: "rotateY(180deg)",
          width: 1,
          height: 1,
          py: 3,
          px: 2,
          bgcolor: "background.alt",
          overflow: "hidden",
        }}
      >
        <Typography variant="h6">
          {movie.title.substring(0,20)}{movie.title.length > 20 && '...'}
        </Typography>
        <Typography variant="caption" height={145} overflow={"hidden"}>
          {movie.overview.substring(0, 200)}...
        </Typography>
        <Box height={100}>
          <GenreChips
            ids={movie.genre_ids}
            sx={{ mt: 1, flexWrap: "wrap" }}
            amount={4}
          />
        </Box>
        <Link onClick={(e) => e.stopPropagation()} variant="caption">
          Go To Movie Page
        </Link>
      </Box>
    </Box>
  );
};

export default MovieDetails;
