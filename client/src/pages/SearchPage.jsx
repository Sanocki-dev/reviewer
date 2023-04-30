import { useState } from "react";
import { Box, Pagination, Typography, useMediaQuery } from "@mui/material";
import { Transition } from "react-transition-group";
import { useLoaderData, useSearchParams } from "react-router-dom";

import ScrollBox from "@/components/ui/ScrollBox";
import { GridView, DetailedView, ViewChanger } from "@/features/movieView";

const SearchPage = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { results, page, total_pages } = useLoaderData();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isLarge = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const onPaginateHandler = (_, value) => {
    setSearchParams({ query: searchParams.get("query"), page: value });
  };

  const onViewHandler = () => {
    setSearchParams({
      display: "grid",
      query: searchParams.get("query"),
      page: searchParams.get("page"),
    });
    setIsGridView((state) => !state);
  };

  return (
    <>
      <ViewChanger isGridView={isGridView} onClick={onViewHandler} />
      <ScrollBox
        sx={{
          height: "calc(100% - 9.4rem)",
        }}
      >
        <Transition in={isGridView} timeout={300} unmountOnExit mountOnEnter>
          {(state) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1,
                mx: isMobile ? 0 : 3,
                opacity: state === "entered" ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            >
              {results?.map((data) => (
                <GridView movie={data} />
              ))}
            </Box>
          )}
        </Transition>
        <Transition in={!isGridView} timeout={300} unmountOnExit mountOnEnter>
          {(state) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mx: isMobile ? 0 : 3,
                opacity: state === "entered" ? 1 : 0,
                transition: "opacity 1s ease-in-out",
                px: isMobile ? 0 : isLarge ? "10%" : "2%",
              }}
            >
              {results?.map((data) => (
                <DetailedView key={data.id} movie={data} />
              ))}
            </Box>
          )}
        </Transition>

        {results && (
          <Box width={1} display="flex" justifyContent={"center"}>
            <Pagination
              sx={{ my: 7 }}
              page={page}
              count={total_pages}
              onChange={onPaginateHandler}
            />
          </Box>
        )}
      </ScrollBox>

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
    </>
  );
};

export default SearchPage;

export const loader = async ({ request, params }) => {
  const { search } = new URL(request.url);
  const { VITE_API_KEY } = import.meta.env;

  const url =
    "https://api.themoviedb.org/3/search/movie" +
    search +
    "&api_key=" +
    VITE_API_KEY;

  const response = await fetch(url, {
    method: "GET",
  });

  const searchResults = await response.json();
  return searchResults;
};
