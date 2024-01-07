import { useLoaderData } from "react-router-dom";
import ShowcaseLayout from "./ShowcaseLayout";
import Section from "./Section";

const HomePage = () => {
  const { trending, upcoming, popular } = useLoaderData();
  const randomNum = Math.floor(Math.random() * (19 - 0 + 1));

  return (
    <ShowcaseLayout movie={trending[randomNum]}>
      <Section movies={trending} title="Trending" />
      <Section movies={upcoming} title="Upcoming" />
      <Section movies={popular} title="popular" />
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
