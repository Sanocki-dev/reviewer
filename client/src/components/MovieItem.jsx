import { CheckCircle, Favorite, WatchLater } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import IMDBRating from "./IMDBRating";

const MovieItem = ({ data, state }) => {
  const { title, poster_path, release_date, vote_average, vote_count } = data;
  const theme = useTheme();
  const mediumMain = theme.palette.neutral.mediumMain;

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
        <Typography variant="subtitle1">{title}</Typography>
        <Typography fontWeight="light" color={mediumMain}>
          {release_date.slice(0, 4)}
        </Typography>
      </BluringBox>
    </Grid>
  );
};

export default MovieItem;

const Score = ({ score, total }) => {
  let green = 235;
  let red = 235;

  score < 5 ? (red = score * 36.6) : (green = 255 - (score - 5) * 36.6);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
          width: "90%",
          mt: 1,
          overflow: "hidden",
          backdropFilter: "brightness(0.4) blur(1px)",
        }}
      >
        <Box>
          <Tooltip title="Add to Watchlist">
            <IconButton>
              <WatchLater />
            </IconButton>
          </Tooltip>
          <Tooltip title="Favorite">
            <IconButton>
              <Favorite />
            </IconButton>
          </Tooltip>
          <Tooltip title="Already Watched">
            <IconButton>
              <CheckCircle />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          position={"relative"}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
        >
          <CircularProgress
            variant="determinate"
            thickness={5}
            size={50}
            title={score}
            sx={{
              color: `rgb(${green},${red},52)`,
            }}
            value={score * 10}
          />
          <Tooltip title={total + " total votes."}>
            <Typography position={"absolute"} variant="caption2">{`${score
              ?.toString()
              .slice(0, 4)}`}</Typography>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

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
