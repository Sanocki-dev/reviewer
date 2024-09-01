import { GetFetch } from "@/utils/getFetch";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Section from "@/templates/Section";
import { Box, Pagination } from "@mui/material";

const SearchPage = () => {
  const { results, page, total_pages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const onPaginateHandler = (_, value) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchParams({ query: searchParams.get("query"), page: value });
  };

  const movies = results.filter(({ media_type }) => media_type === "movie");
  const series = results.filter(({ media_type }) => media_type === "tv");
  const person = results.filter(({ media_type }) => media_type === "person");

  return (
    <>
      <Section data={movies} title="Movies" type="movie" />
      <Section data={series} title="TV" type="tv" />
      <Section data={person} title="Actors" type="person" />
      {/* {movies && (
        <Box width={1} display="flex" justifyContent={"center"}>
          <Pagination
            sx={{ my: 7 }}
            page={page}
            count={total_pages}
            onChange={onPaginateHandler}
          />
        </Box>
      )} */}
    </>
  );
};

export default SearchPage;

export const loader = async ({ request }) => {
  const { search } = new URL(request.url);

  try {
    const { data } = await GetFetch(`multi${search}`);
    return data;
  } catch (error) {
    return { error: error };
  }
};
