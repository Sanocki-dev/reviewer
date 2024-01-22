import { Box } from "@mui/material";

import MovieCard from "@/organisms/Movie/MovieCard";
import SectionHeader from "@/molecules/SectionHeader";

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
          maxWidth: 1080,
          mx: "auto",
        }}
      >
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Box>
    </>
  );
};

export default Section;
