import { useState } from "react";
import { Box, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import GenreChips from "@/molecules/GenreChips";

const url = "https://image.tmdb.org/t/p/w1280";
const noImageURL =
  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [flip, setFlip] = useState(true);

  const triggerFlip = () => {
    setFlip((state) => !state);
  };

  const onClickHandler = (e) => {
    e.stopPropagation();
    navigate({ pathname: "/movie", search: "?id=" + movie?.id });
  };

  return (
    <Card flip={flip} onClick={triggerFlip}>
      <Front image={movie.poster_path} />
      <Back>
        <Typography variant="h6" noWrap>
          {movie.title}
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
        <Link onClick={onClickHandler} variant="caption">
          Go To Movie Page
        </Link>
      </Back>
    </Card>
  );
};

export default MovieCard;

const Card = (props) => (
  <Box
    sx={{
      cursor: "pointer",
      width: 200,
      height: 300,
      transform: props.flip ? "transform: rotateY(0deg);" : "rotateY(180deg)",
      perspective: "1000px",
      transformStyle: "preserve-3d",
      transition: "transform 1s",
      position: "relative",
    }}
    onClick={props.onClick}
  >
    {props.children}
  </Box>
);

const Front = (props) => (
  <Box
    sx={{
      borderRadius: 2,
      position: "absolute",
      backfaceVisibility: "hidden",

      width: 1,
      height: 1,
      backgroundImage: !props.image
        ? `url(${noImageURL})`
        : `url(${url}${props.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {props.children}
  </Box>
);

const Back = (props) => (
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
    {props.children}
  </Box>
);