import { getFetch } from "../lib/getFetch.js";
import querystring from "node:querystring";
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

// PERSON SEARCH //
export const getPerson = async (req, res) => {
  const { id } = req.query;

  const url = `https://api.themoviedb.org/3/person/${id}?append_to_response=movie_credits,tv_credits`;

  try {
    const results = await getFetch({
      url,
      headers: headers.TMDB,
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(400);
  }
};

// Show SEARCH //
export const getShow = async (req, res) => {
  const { id } = req.query;
  const url = `https://api.themoviedb.org/3/tv/${id}`;

  try {
    const results = await getFetch({
      url,
      headers: headers.TMDB,
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(400);
  }
};

// MOVIE SEARCH //
export const getTrending = async (req, res) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;

  try {
    const results = await getFetch({
      url,
      headers: headers.TMDB,
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(400);
  }
};

// MOVIE SEARCH //
export const getMovies = async (req, res) => {
  const url = `https://api.themoviedb.org/3/search/movie?${req._parsedUrl.query}`;

  try {
    const { total_pages, page, results } = await getFetch({
      url,
      headers: headers.TMDB,
    });

    res.status(200).json({ results, page, total_pages });
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

export const multiSearch = async (req, res) => {
  const queryString = querystring.stringify(req.query);

  try {
    const response = await getFetch({
      url: `https://api.themoviedb.org/3/search/multi?${queryString}`,
      headers: headers.TMDB,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send();
  }
};

// RETRIEVE MOVIE ratings
export const getAllMovieDetails = async (req, res) => {
  const { id } = req.query;

  const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,recommendations,similar,videos,images,watch/providers,release_dates`;

  try {
    const details = await getFetch({ url: url, headers: headers.TMDB });

    const reviews = await Review.find({ movieId: id })
      .populate("userId", "userName", "User")
      .sort({ medals: -1 });

    reviews.forEach(async ({ _id, userId }) => {
      if (userId === null) {
        const deleted = await Review.deleteOne({ _id });
        console.log(deleted);
      }
    });

    const response = { ...details, reviews };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send();
  }
};
