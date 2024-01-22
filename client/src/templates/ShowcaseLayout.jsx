import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { light, dark } from "@/assets/background";
import GenreChips from "@/molecules/GenreChips";

const ShowcaseLayout = ({ movie, children }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const bg = palette.mode === "dark" ? dark : light;

  const onClickHandler = () => {
    navigate({ pathname: "/movie", search: "?id=" + movie?.id });
  };

  return (
    <Stack width={1} alignItems={"center"} bgcolor={"gainsboro"}>
      <BackdropImage image={movie.poster_path} />
      <MovieSummary movie={movie} onClick={onClickHandler} />
      <Box
        component="section"
        sx={{
          background: `url(${bg})`,
          backgroundSize: "cover",
          bgcolor: "background.default",
          width: 1,
          minHeight: 700,
        }}
      >
        <Box sx={{ width: isMobile ? 1 : "80%", mx: "auto", my: 2 }}>
          {children}
        </Box>
      </Box>
    </Stack>
  );
};

export default ShowcaseLayout;

const BackdropImage = ({ image }) => (
  <Box
    component={"img"}
    src={"https://image.tmdb.org/t/p/w1280/" + image}
    sx={{
      width: 1,
      objectFit: "cover",
      objectPosition: "center",
      zIndex: 0,
      position: "absolute",
      height: 600,
      filter: " brightness(.7)",
      pointerEvents: "none",
    }}
  />
);

const MovieSummary = ({ movie, onClick }) => (
  <Stack
    sx={{
      justifyContent: "center",
      width: "50%",
      alignSelf: "flex-start",
      ml: "15%",
      maxWidth: 500,
      height: 600,
      zIndex: 1,
      color: "white",
    }}
  >
    <Typography variant="h1">{movie.title}</Typography>
    <Typography
      variant="h5"
      sx={{ mt: 3, maxHeight: 200, overflowY: "hidden" }}
    >
      {movie.overview}
    </Typography>
    <GenreChips ids={movie.genre_ids} />
    <Button
      sx={{ mt: 3, width: "110px" }}
      variant="contained"
      onClick={onClick}
    >
      View Movie
    </Button>
  </Stack>
);
