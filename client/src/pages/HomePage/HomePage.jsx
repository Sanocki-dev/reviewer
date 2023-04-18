import { useLoaderData } from "react-router-dom";

import ScrollBox from "@/components/ScrollBox";
import TrendingSection from "./TrendingSection";
import ComingSoon from "./ComingSoon";
import { Box } from "@mui/material";
import Popular from "./Popular";

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
      <TrendingSection />
      <Box mb={2} />
      <ComingSoon />
      <Box mb={2} />
      <Popular />
    </ScrollBox>
  );
};

export default HomePage;

export const loader = async ({ filter = "day" }) => {
  const { VITE_API_KEY } = import.meta.env;

  const url = [
    fetch(
      "https://api.themoviedb.org/3/trending/movie/" +
        filter +
        "?api_key=" +
        VITE_API_KEY
    ),
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=" +
        VITE_API_KEY +
        "&language=en-US&page=1"
    ),
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
        VITE_API_KEY +
        "&language=en-US&page=1"
    ),
  ];

  try {
    const res = await Promise.all(url);
    const data = await Promise.all(
      res.map((item) => {
        return item.json();
      })
    );

    return {
      trending: data[0].results,
      upcoming: data[1].results,
      popular: data[2].results,
    };
  } catch (error) {
    console.log(error);
  }
};
