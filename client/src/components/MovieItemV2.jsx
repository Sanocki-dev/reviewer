import { FavoriteBorder, Visibility, WatchLater } from "@mui/icons-material";
import {
  Box,
  Chip,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { genres } from "./Genres";
import IMDBRating from "./IMDBRating";

const MovieItemV2 = ({ data, state }) => {
  const {
    title,
    poster_path,
    release_date,
    genre_ids,
    overview,
    vote_count,
    vote_average,
  } = data;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const imageURL = poster_path
    ? "https://image.tmdb.org/t/p/w500/" + poster_path
    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

  const OverviewSection = () => (
    <Box
      display="flex"
      flexDirection={"column"}
      width={1}
      flex={1}
      pt={isMobile ? 1 : 0}
      px={isMobile ? 3 : 6}
    >
      <Typography variant="h4" fontWeight={400}>
        {title}
      </Typography>
      <Typography variant="subtitle2" fontWeight={400}>
        {release_date.slice(0, 4)}
      </Typography>
      <Box>
        {genre_ids.map((id) => (
          <Chip
            key={id}
            sx={{
              mr: 1,
              my: 1,
              borderRadius: 3,
              backdropFilter: "blur(10px)",
            }}
            label={genres.find((genre) => genre.id == id).name}
          />
        ))}
      </Box>
      <Typography fontWeight="light" color={"medium.main"}>
        {overview || "No overview is avaliable for this title."}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "relative",
        opacity: state === "entered" ? 1 : 0,
        mt: state === 'entered' ? 0 : 200,
        width:1,
        transition: "all .5s ease-in-out",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: isMobile ? "space-between" : "initial",
          mx: 2,
        }}
      >
        <Box
          sx={{
            height: 200,
            width: 150,
            objectFit: "fit",
            borderRadius: "20px",
          }}
          component={"img"}
          src={imageURL}
          alt={title + " image"}
        />
        {!isMobile && OverviewSection()}
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          minWidth={100}
        >
          <IMDBRating score={vote_average} total={vote_count} isPlaced />
          <IconButton>
            <WatchLater />
          </IconButton>
          <IconButton>
            <FavoriteBorder />
          </IconButton>
          <IconButton>
            <Visibility />
          </IconButton>
        </Box>
      </Grid>
      {isMobile && OverviewSection()}
    </Box>
  );
};

export default MovieItemV2;
