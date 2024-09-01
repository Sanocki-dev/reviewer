import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { baseImageURL, noImageURL } from "@/data/Images";
import HorizontalScroll from "@/molecules/HorizontalScroll";

const CastScroller = ({ title, cast }) => {
  const navigate = useNavigate();

  if (cast.length === 0) return;

  return (
    <Box width={1} p={3} mt={2} borderRadius={2} bgcolor={"background.alt"}>
      <Typography variant="h5" mb={2}>
        {title || "Cast"}
      </Typography>

      <HorizontalScroll width={116} scroll={5}>
        {cast.map(({ id, character, name, profile_path }) => {
          let photo = !profile_path ? noImageURL : baseImageURL + profile_path;
          return (
            <Box
              key={id}
              onClick={() => navigate(`/person?id=${id}`)}
              sx={{
                cursor: "pointer",
                p: 1,
                "&:hover": {
                  bgcolor: "background.default",
                },
              }}
            >
              <Box
                component="img"
                src={photo}
                sx={{
                  objectFit: "cover",
                  borderRadius: 2,
                  minHeight: 150,
                  width: 100,
                }}
              />
              <Typography variant="h6">{name}</Typography>
              <Typography variant="caption">
                {character.slice(0, 15) + (character?.length > 15 ? "..." : "")}
              </Typography>
            </Box>
          );
        })}
      </HorizontalScroll>
    </Box>
  );
};

export default CastScroller;
