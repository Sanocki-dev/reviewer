import {
  Box,
  Grid,
  IconButton,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TableRows, Window } from "@mui/icons-material";
import { Transition } from "react-transition-group";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useState } from "react";

import ScrollBox from "@/components/ScrollBox";
import MovieItem from "@/components/MovieItem";
import MovieItemV2 from "@/components/MovieItemV2";

const SearchPage = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { results, page, total_pages } = useLoaderData();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const neutralLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;

  const sortedMovies = results?.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  const onPaginateHandler = (_, value) => {
    setSearchParams({ query: searchParams.get("query"), page: value });
  };

  console.log(sortedMovies);
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
      <Grid container position="relative" rowGap={3}>
        <Transition in={isGridView} timeout={300} unmountOnExit mountOnEnter>
          {(state) =>
            sortedMovies?.map((data) => (
              <MovieItem state={state} key={data.id} data={data} />
            ))
          }
        </Transition>
        <Transition in={!isGridView} timeout={300} unmountOnExit mountOnEnter>
          {(state) =>
            sortedMovies?.map((data) => (
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

      {!results && (
        <Typography
          textAlign="center"
          mt={15}
          variant="h1"
          color="neutral.medium"
        >
          No movies found
        </Typography>
      )}
      <Pagination
        sx={{ my: 7, display: "flex", justifyContent: "center" }}
        page={page}
        count={total_pages}
        showFirstButton
        showLastButton
        onChange={onPaginateHandler}
      />
    </ScrollBox>
  );
};

export default SearchPage;

export const loader = async ({ request }) => {
  const { search } = new URL(request.url);

  const url = import.meta.env.VITE_BASE_SEARCH_URL + search.replace("?", "&");

  const response = await fetch(url, {
    method: "GET",
  });

  const searchResults = await response.json();
  return searchResults;
};
