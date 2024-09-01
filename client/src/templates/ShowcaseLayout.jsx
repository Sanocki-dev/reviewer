import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import GenreChips from "@/molecules/GenreChips";
import ShowcaseImage from "@/molecules/ShowcaseImage";

const ShowcaseLayout = ({ movie, children, backdrop, width = "75%" }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const onClickHandler = () => {
    navigate({ pathname: "/movie", search: "?id=" + movie?.id });
  };

  return (
    <Stack width={1} alignItems={"center"}>
      <ShowcaseImage image={movie.backdrop_path} />
      {!backdrop && (
        <MovieSummary
          movie={movie}
          onClick={onClickHandler}
          isMobile={isMobile}
        />
      )}

      <Box
        sx={{
          width: isMobile ? 1 : width,
          mx: "auto",
          my: 2,
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default ShowcaseLayout;

const MovieSummary = ({ movie, onClick, isMobile }) => (
  <Stack
    sx={{
      justifyContent: "center",
      width: isMobile ? 1 : "50%",
      alignSelf: "flex-start",
      ml: isMobile ? 0 : "16%",
      maxWidth: 500,
      height: 600,
      zIndex: 1,
      color: "white",
      px: isMobile ? 2 : 4,
    }}
  >
    <Typography variant="h1">{movie.title}</Typography>
    <Typography
      variant="h5"
      sx={{ mt: 3, maxHeight: 200, overflowY: "hidden" }}
    >
      {movie.overview}
    </Typography>
    <GenreChips variant="solid" color="primary" ids={movie.genre_ids} />
    <Button
      sx={{ mt: 3, width: "110px" }}
      variant="contained"
      onClick={onClick}
    >
      View Movie
    </Button>
  </Stack>
);
