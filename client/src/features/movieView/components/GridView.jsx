import { Box, Modal, useMediaQuery } from "@mui/material";

import ScoreCircle from "./ScoreCircle";
import MovieImage from "./MovieImage";
import { DetailedView } from "..";
import { useState } from "react";

const MovieGridView = ({ movie }) => {
  const { id, poster_path, title, vote_average, vote_count } = movie;
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        key={id}
        display="flex"
        flexDirection="column"
        position={"relative"}
        sx={{
          transition: "all 1s ease-in-out",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(true)}
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
          <MovieImage
            title={title}
            image={poster_path}
            sx={{
              height: 1,
              width: 1,
              objectFit: "cover",
            }}
          />
        </Box>

        {vote_count > 0 && (
          <ScoreCircle
            sx={{ top: 20, right: 5 }}
            total={vote_count}
            score={vote_average}
          />
        )}
      </Box>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box width={"50%"}>
          <DetailedView id={id} />
        </Box>
      </Modal>
    </>
  );
};

export default MovieGridView;
