import { Box, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";

import SearchBar from "@/components/SearchBar";

const Welcome = () => {
  const { upcoming } = useLoaderData();

  const imageURL =
    "https://image.tmdb.org/t/p/w500/" + upcoming[0].backdrop_path;

  return (
    <Box
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        component={"img"}
        src={imageURL}
        sx={{ position: "absolute", width: 1, height:1, objectFit: "cover" }}
      />
      <Box
        zIndex={2}
        px={'10%'}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backdropFilter: "blur(2px) brightness(0.7)",
          zIndex: 1,
          width: 1,
          height: 1,
        }}
      >
        <Typography variant="h1">Welcome to R8Hub!</Typography>
        <Typography mb={3} variant="h3">
          A place to review and share your favorite movies.
        </Typography>
        <SearchBar fullWidth filled placeholder="Begin your search!" />
      </Box>
    </Box>
  );
};

export default Welcome;
