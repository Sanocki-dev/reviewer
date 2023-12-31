import { Box, useMediaQuery } from "@mui/material";

import Details from "./Details";
import MovieImage from "../MovieImage";
import Actions from "./Actions";
import PosterWithTrailer from "./PosterWithTrailer";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailedView = ({ movie, id }) => {
  const [data, setData] = useState(movie);
  const isMobile = true

  useEffect(() => {
    const getDetails = async () => {
      try {
        let { data } = await axios.get(`${import.meta.env.VITE_SITE_URL}/detail?id=${id}`);
        setData(data);
      } catch (error) {
        console.log("error");
      }
    };
    if (id) getDetails();

    return () => {};
  }, []);

  return (
    <Box
      bgcolor={"neutral.light"}
      position={"relative"}
      py={2}
      borderRadius={isMobile ? 0 : 2}
    >
      {isMobile && (
        <MovieImage
          title={data?.title}
          image={data?.backdrop_path ? data?.backdrop_path : data?.poster_path}
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
        <PosterWithTrailer details={data} />
        {!isMobile && <Details data={data} isMobile={isMobile} />}
        <Actions data={data} />
      </Box>
      {isMobile && <Details data={data} isMobile={isMobile} />}
    </Box>
  );
};

export default DetailedView;
