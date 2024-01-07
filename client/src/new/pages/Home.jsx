import { useLoaderData } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ShowcaseLayout from "./ShowcaseLayout";
import MovieDetails from "./MovieDetails";

const HomePage = () => {
  const { trending, upcoming, popular } = useLoaderData();
  const randomNum = Math.floor(Math.random() * (19 - 0 + 1));

  return (
    <ShowcaseLayout movie={upcoming[randomNum]}>
      <Typography variant="h3" sx={{ my: 2, fontWeight: 200, }}>
        Trending
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {trending.map((movie) => (
          <MovieDetails movie={movie} />
        ))}
      </Box>
      <Typography variant="h3" sx={{ my: 2, fontWeight: 200 }}>
        Upcoming
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {upcoming.map((movie) => (
          <MovieDetails movie={movie} />
        ))}
      </Box>
      <Typography variant="h3" sx={{ my: 2, fontWeight: 200 }}>
        Popular
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {popular.map((movie) => (
          <MovieDetails movie={movie} />
        ))}
      </Box>
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
