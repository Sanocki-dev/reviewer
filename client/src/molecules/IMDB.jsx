import { Box } from "@mui/material";
import React, { useEffect } from "react";

const IMDBRating = ({ id, alt }) => {
  useEffect(() => {
    // Dynamically load the IMDb rating script
    const script = document.createElement("script");
    script.src =
      "https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";
    script.id = "imdb-rating-api";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box
      sx={{
        "> span": {
          color: "white",
          margin: 0,
          gap: 1,
          display: "flex",
          alignItems: "baseline",
        },
      }}
    >
      <span
        className="imdbRatingPlugin"
        data-user="ur186102128"
        data-title={id}
        data-style="p3"
      >
        <a href={`https://www.imdb.com/title/${id}/?ref_=plg_rt_1`}>
          <img
            src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_37x18.png"
            alt={`${alt}-imdb-rating`}
          />
        </a>
      </span>
    </Box>
  );
};

export default IMDBRating;
