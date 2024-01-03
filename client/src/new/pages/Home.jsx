import { useLoaderData } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ShowcaseLayout from "./ShowcaseLayout";

const HomePage = () => {
  const { upcoming, popular } = useLoaderData();

  const img = "https://image.tmdb.org/t/p/w1280/" + upcoming[0].backdrop_path;

  return (
    <ShowcaseLayout image={img}>
      <Box height={400} bgcolor={'red'}/>
      <Box height={400} bgcolor={'green'}/>
      <Box height={400} bgcolor={'blue'}/>
    </ShowcaseLayout>
  );
};

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

export default HomePage;
