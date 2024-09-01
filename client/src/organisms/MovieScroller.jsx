import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { baseImageURL, noImageURL } from "@/data/Images";
import HorizontalScroll from "@/molecules/HorizontalScroll";

const MovieScroller = ({ title, data }) => {
  const navigate = useNavigate();

  return (
    <Box width={1} p={3} mt={2} borderRadius={2} bgcolor={"background.alt"}>
      <Typography variant="h5" mb={2}>
        {title}
      </Typography>

      <HorizontalScroll width={116} scroll={5}>
        {data?.map(({ id, title, poster_path }) => {
          let photo = !poster_path ? noImageURL : baseImageURL + poster_path;
          return (
            <Box
              key={id}
              onClick={() => navigate(`/movie?id=${id}`)}
              sx={{
                cursor: "pointer",
                width:150,
                p: 1,
                "&:hover": {
                  bgcolor: "background.default",
                },
              }}
            >
              <Box
                component="img"
                src={photo}
                alt={title}
                sx={{
                  objectFit: "cover",
                  borderRadius: 2,
                  minHeight: 150,
                  width: 100,
                }}
              />
              <Typography variant="caption">
                {title.slice(0, 30) + (title.length > 30 ? "..." : "")}
              </Typography>
            </Box>
          );
        })}
      </HorizontalScroll>
    </Box>
  );
};

export default MovieScroller;
