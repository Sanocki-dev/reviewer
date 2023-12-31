import { Box, Button, Skeleton, Stack } from "@mui/material";
import { useState } from "react";

import MovieImage from "../MovieImage";
import VideoModal from "./VideoModal";

const PosterWithTrailer = ({ details }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!details)
    return (
      <Box>
        <Skeleton width={180} height={320} sx={{ mt: -7.5 }}></Skeleton>
        <Skeleton width={180} height={40} sx={{ mt: -6 }}></Skeleton>
      </Box>
    );

  return (
    <>
      <Stack alignItems={"center"} zIndex={2}>
        <MovieImage
          title={details?.title}
          image={details?.poster_path}
          sx={{ borderRadius: 2, mb: details?.trailerURL ? 0 : 4 }}
        />
        {details?.videos && (
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
        trailerURL={details?.videos[0]}
      />
    </>
  );
};

export default PosterWithTrailer;
