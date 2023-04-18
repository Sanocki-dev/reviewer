import { Box, Grid, Typography } from "@mui/material";

import IMDBRating from "./IMDBRating";

const MovieItem = ({ data, state = "entered" }) => {
  const {
    title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    first_air_date,
    original_name,
  } = data;

  const imageURL = poster_path
    ? "https://image.tmdb.org/t/p/w500/" + poster_path
    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      lg={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        maxHeight: 450,
        height: state === "entered" ? 1 : 0,
        overflow: "hidden",
        opacity: state === "entered" ? 1 : 0,
        scale: state === "entered" ? 1 : 0,
        transition: "all .5s ease-in-out",
        "&:hover > img": { borderColor: "primary.main" },
      }}
    >
      <Image imageURL={imageURL} title={title} />
      {/* <Score score={vote_average} total={vote_count} /> */}
      <IMDBRating score={vote_average} total={vote_count} />
      <BluringBox imageURL={imageURL}>
        <Typography variant="subtitle1">{title || original_name}</Typography>
        <Typography fontWeight="light" color={"medium.main"}>
          {(release_date || first_air_date)?.slice(0, 4) || "N/A"}
        </Typography>
      </BluringBox>
    </Grid>
  );
};

export default MovieItem;

const Image = ({ imageURL, title }) => (
  <Box
    sx={{
      width: "95%",
      height: 320,
      // width:300,
      borderBottom: "2px solid transparent",
      objectFit: "cover",
      objectPosition: "top",
    }}
    component={"img"}
    src={imageURL}
    alt={title + " image"}
  />
);

const BluringBox = ({ children }) => (
  <Box
    sx={{
      position: "absolute",
      backdropFilter: "brightness(0.3) blur(4px)",
      width: "96%",
      bottom: -1,
      p: 2,
    }}
  >
    {children}
  </Box>
);
