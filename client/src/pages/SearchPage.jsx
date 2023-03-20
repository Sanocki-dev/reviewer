import {
  Box,
  Grid,
  IconButton,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

import ScrollBox from "@/components/ScrollBox";
import MovieItem from "@/components/MovieItem";
import MovieItemV2 from "@/components/MovieItemV2";
import { useState } from "react";
import { TableRows, Window } from "@mui/icons-material";
import { Transition } from "react-transition-group";

const HomePage = () => {
  const movies = useSelector((state) => state.movies);
  const [isGridView, setIsGridView] = useState(false);

  const isLoading = !movies;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const neutralLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;

  const skeletons = [];

  for (let index = 0; index < 10; index++) {
    skeletons.push(
      <Skeleton
        variant="rectangular"
        height={450}
        width={300}
        display="inline-block"
      />
    );
  }

  const sortedMovies = movies
    .filter((a) => a.vote_count > 10)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  return (
    <ScrollBox
      sx={{
        position: "relative",
        height: "100%",
        maxHeight: "calc(100% - 6rem)",
        p: isMobile ? 0 : 5,
        pt: 0,
      }}
    >
      <Box width={1} py={1} display="flex" justifyContent={"end"}>
        <IconButton onClick={() => setIsGridView((state) => !state)}>
          {isGridView ? <TableRows /> : <Window />}
        </IconButton>
      </Box>
      {isLoading && skeletons}
      <Grid container position="relative" rowGap={3}>
        <Transition in={isGridView} timeout={300} unmountOnExit mountOnEnter>
          {(state) =>
            sortedMovies
              ?.map((data) => (
                <MovieItem state={state} key={data.id} data={data} />
              ))
          }
        </Transition>
        <Transition in={!isGridView} timeout={300} unmountOnExit mountOnEnter>
          {(state) =>
            sortedMovies
              ?.map((data) => (
                <MovieItemV2 key={data.id} state={state} data={data} />
              ))
          }
        </Transition>
      </Grid>

      <Box
        bottom={0}
        position={"fixed"}
        width="100%"
        height={150}
        sx={{
          background:
            "linear-gradient(0deg, " +
            alt +
            " 20%, " +
            neutralLight +
            "01 100%)",
        }}
      />

      {!movies && (
        <Typography
          textAlign="center"
          mt={15}
          variant="h1"
          color="neutral.medium"
        >
          No movies found
        </Typography>
      )}
    </ScrollBox>
  );
};

export default HomePage;
