import { getFetch } from "../lib/getFetch.js";
import Review from "../models/Review.js";

const headers = {
  TMDB: {
    Authorization: `Bearer ${process.env.TMDB_KEY}`,
  },
  RAPID: {
    "X-RapidAPI-Key": process.env.RATING_KEY,
    "X-RapidAPI-Host": "movies-ratings2.p.rapidapi.com",
  },
};

// MOVIE SEARCH //
export const getMovies = async (req, res) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${req.query.search}`;

  try {
    const { total_pages, page, results } = await getFetch({
      url,
      headers: headers.TMDB,
    });

    let formattedList = [];

    for (let index = 0; index < results.length; index++) {
      let { data } = await movieDetails(results[index].id);
      data.videos = await formatVideos(data.videos.results);
      formattedList.push(data);
    }

    res.status(200).json({ results: formattedList, page, total_pages });
  } catch (error) {
    res.status(400);
  }
};

// RETRIEVE MOVIE DETAILS
export const getMovieDetails = async (req, res) => {
  const { id } = req.query;
  let { data, status } = await movieDetails(id);

  data.videos = await formatVideos(data.videos.results);
  res.status(status).json(data);
};

const formatVideos = async (arr) => {
  let YTvideos = [];

  arr?.forEach(({ site, type, key }) => {
    if (site === "YouTube" && type === "Trailer") {
      YTvideos.push("https://www.youtube.com/embed/" + key);
    }
  });

  return YTvideos;
};

const movieDetails = async (id) => {
  try {
    const response = await getFetch({
      url: `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,recommendations,similar,videos,images,watch/providers,release_dates`,
      headers: headers.TMDB,
    });
    return { status: 200, data: response };
  } catch (error) {
    return { status: 400, data: error };
  }
};

// RETRIEVE MOVIE ratings
export const getAllMovieDetails = async (req, res) => {
  const { id } = req.query;

  const urls = [
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,recommendations,similar,videos,images,watch/providers,release_dates`,
    // "https://movies-ratings2.p.rapidapi.com/ratings",
  ];

  try {
    const details = await getFetch({ url: urls[0], headers: headers.TMDB });

    const reviews = await Review.find({ movieId: id }).populate(
      "userId",
      ["userName", "picturePath"],
      "User"
    ).sort({_id:-1});

    // const { ratings } = await getFetch({
    //   url: urls[1],
    //   params: { id },
    //   headers: headers.RAPID,
    // });

    const response = { ...details, reviews };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send();
  }
};
