import { Router } from "express";
import { getMovieDetails, getMovies, getAllMovieDetails } from "../controllers/movies.js";

const movieRouter = new Router();

movieRouter.get("/search", getMovies);
movieRouter.get("/detail", getMovieDetails);
movieRouter.get("/movie", getAllMovieDetails);


export default movieRouter;
