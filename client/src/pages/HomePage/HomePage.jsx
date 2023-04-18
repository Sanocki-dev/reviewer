import { useLoaderData } from "react-router-dom";

import ScrollBox from "@/components/ScrollBox";
import TrendingSection from "./TrendingSection";
import TopRated from "./TopRated";
import { Box } from "@mui/material";

const HomePage = () => {
  const { results } = useLoaderData();

  return (
    <ScrollBox
      sx={{
        height: "100%",
        maxHeight: "calc(100% - 6rem)",
        p: 3,
      }}
    >
      <TrendingSection data={results} />
      <Box mb={2} />
      <TopRated data={results} />
    </ScrollBox>
  );
};

export default HomePage;

export const loader = async () => {
  const { VITE_API_KEY } = import.meta.env;
  const url =
    "https://api.themoviedb.org/3/trending/movie/day" +
    "?api_key=" +
    VITE_API_KEY;

  const response = await fetch(url, {
    method: "GET",
  });

  const searchResults = await response.json();
  return searchResults;
};
