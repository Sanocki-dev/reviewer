import { Box, Stack, Typography } from "@mui/material";

import MovieDetails from "./MovieDetails";

const Section = ({ movies, title }) => {

  return (
    <>
      <SectionHeader title={title} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {movies.map((movie, index) => (
          <MovieDetails key={index} movie={movie} />
        ))}
      </Box>
    </>
  );
};

export default Section;

const SectionHeader = ({ title }) => (
  <Stack direction={"row"} alignItems={"center"}>
    <Box height={2} width={1} bgcolor={"secondary.main"} />
    <Typography
      variant="h3"
      sx={{ my: 2, fontWeight: 300, mx: 2, textAlign: "center", textTransform:'capitalize' }}
    >
      {title}
    </Typography>
    <Box height={2} width={1} bgcolor={"secondary.main"} />
  </Stack>
);
