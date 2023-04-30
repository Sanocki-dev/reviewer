import { Button, Stack } from "@mui/material";
import { useState } from "react";

import MovieImage from "../MovieImage";
import VideoModal from "./VideoModal";

const PosterWithTrailer = ({ details }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <>
      <Stack alignItems={"center"} zIndex={2}>
        <MovieImage
          title={details.title}
          image={details.poster_path}
          sx={{ borderRadius: 2 }}
        />
        {details.trailerURL && (
          <Button
            onClick={() => setShowTrailer((state) => !state)}
            fontSize={12}
            underline="hover"
          >
            View Trailer
          </Button>
        )}
      </Stack>
      <VideoModal
        showTrailer={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerURL={details.trailerURL}
      />
    </>
  );
};

export default PosterWithTrailer;
