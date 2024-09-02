import { Router } from "express";
import { getMovieDetails, getMovies, getAllMovieDetails, getTrending, multiSearch, getPerson, getShow } from "../controllers/movies.js";

const movieRouter = new Router();

movieRouter.get("/search", getMovies);
movieRouter.get("/trending", getTrending);
movieRouter.get("/multi", multiSearch);
movieRouter.get("/detail", getMovieDetails);
movieRouter.get("/movie", getAllMovieDetails);


movieRouter.get("/person", getPerson);
movieRouter.get("/show", getShow);


export default movieRouter;
