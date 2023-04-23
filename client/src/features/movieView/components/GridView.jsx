import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import ScoreCircle from "./ScoreCircle";

const MovieGridView = ({ movies, state = "entered" }) => {
  const imageURL = "https://image.tmdb.org/t/p/w500/";
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const noImageURL =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

  return movies?.map(({ id, poster_path, title, vote_average, vote_count }) => {
    if (!poster_path) return;

    return (
      <Box
        key={id}
        display="flex"
        flexDirection="column"
        position={"relative"}
        sx={{
          opacity: state === "entered" ? 1 : 0,
          top: state === "entered" ? 0 : 1000,
          transition: "all 1s ease-in-out",
        }}
      >
        <Box
          component={"section"}
          sx={{
            position: "relative",
            height: isMobile ? 160 : 300,
            aspectRatio: "3/4.4",
            borderRadius: 3,
            overflow: "hidden",
            mt: 2,
          }}
        >
          <Box
            component={"img"}
            src={poster_path ? imageURL + poster_path : noImageURL}
            alt={`${title}-backdrop`}
            sx={{
              height: 1,
              width: 1,
              objectFit: "cover",
            }}
          />
        </Box>

        <ScoreCircle
          sx={{ top: 0, right: -20 }}
          total={vote_count}
          score={vote_average}
        />
      </Box>
    );
  });
};

export default MovieGridView;
