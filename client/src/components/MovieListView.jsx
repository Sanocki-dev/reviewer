import { FavoriteBorder, Visibility, WatchLater } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { genres } from "./Genres";
import ScoreCircle from "./ScoreCircle";

const MovieListView = ({ movies }) => {
  const imageURL = "https://image.tmdb.org/t/p/w500/";
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const noImageURL =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

  // Text section that moves depending on screen size
  const OverviewSection = (title, release_date, genre_ids, overview) => (
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
        {release_date?.slice(0, 4) || "N/A"}
      </Typography>
      <Box>
        {genre_ids?.map((id) => (
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

  return movies?.map(
    ({
      title,
      poster_path,
      release_date,
      genre_ids,
      overview,
      vote_count,
      vote_average,
    }) => (
      <Box width={1} display="flex">
        <Box
          sx={{
            height: 200,
            width: 150,
            objectFit: "fit",
            borderRadius: "20px",
          }}
          component={"img"}
          src={poster_path ? imageURL + poster_path : noImageURL}
          alt={title + " image"}
        />
        {!isMobile && OverviewSection(title, release_date, genre_ids, overview)}
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          minWidth={100}
        >
          <ScoreCircle score={vote_average} total={vote_count} isPlaced />
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
        {isMobile && OverviewSection(title, release_date, genre_ids, overview)}
      </Box>
    )
  );
};

export default MovieListView;
