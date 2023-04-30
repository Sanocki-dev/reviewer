import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

import Details from "./Details";
import MovieImage from "../MovieImage";
import Actions from "./Actions";
import PosterWithTrailer from "./PosterWithTrailer";

const DetailedView = ({ movie }) => {
  const [details, setDetails] = useState({});
  const { id } = movie;
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    const { VITE_API_KEY } = import.meta.env;

    const fetchData = async () => {
      const url =
        "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=" +
        VITE_API_KEY +
        "&append_to_response=videos,watch/providers,release_dates";

      const response = await fetch(url, {
        method: "GET",
      });

      let searchResults = await response.json();

      const youtubeURL = "https://www.youtube.com/embed/";
      const vimeoURL = " https://vimeo.com/";

      let trailerURL = null;
      const hasTrailer = searchResults.videos.results.find(
        (value) => value.type == "Trailer"
      );

      // If there is a trailer linked to this movie creates the link
      if (hasTrailer) {
        trailerURL =
          hasTrailer?.site == "YouTube"
            ? youtubeURL + hasTrailer.key
            : vimeoURL + hasTrailer.key;
      }
      searchResults = { ...searchResults, trailerURL };
      setDetails(searchResults);
    };
    fetchData();
    return () => {};
  }, [id, setDetails]);

  return (
    <Box
      bgcolor={"neutral.light"}
      position={"relative"}
      py={2}
      borderRadius={isMobile ? 0 : 2}
    >
      {isMobile && (
        <MovieImage
          title={details.title}
          image={
            details.backdrop_path ? details.backdrop_path : details.poster_path
          }
          sx={{
            position: "absolute",
            width: 1,
            objectFit: "cover",
            top: 0,
            height: 241,
            filter: "blur(1px) brightness(.25)",
          }}
        />
      )}
      <Box
        display={"flex"}
        borderRadius={2}
        justifyContent={"space-between"}
        px={3}
      >
        <PosterWithTrailer details={details} />
        {!isMobile && <Details data={details} isMobile={isMobile} />}
        <Actions data={details} />
      </Box>
      {isMobile && <Details data={details} isMobile={isMobile} />}
    </Box>
  );
};

export default DetailedView;
