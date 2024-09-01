import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

import TrailerSlider from "@/molecules/TrailerSlider";
import ImageSlider from "@/molecules/ImageSlider";

import Reviews from "@/organisms/Movie/Reviews";
import Providers from "@/organisms/Movie/Providers";
import Overview from "@/organisms/Movie/Overview";
import MovieHeader from "@/organisms/Movie/MovieHeader";
import { GetFetch } from "@/utils/getFetch";

import CastScroller from "@/organisms/People/CastScroller";
import ShowcaseLayout from "@/templates/ShowcaseLayout";
import MovieScroller from "@/organisms/MovieScroller";
import ScoreCircle from "@/molecules/ScoreCircle";

const MoviePage = () => {
  const data = useLoaderData();
  const user = useSelector((state) => state.user);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  let userReview = data.reviews?.find(({ userId }) => userId._id === user?.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data]);

  return (
    <ShowcaseLayout movie={data} backdrop>
      {userReview && (
        <Box
          position={"absolute"}
          right={"50%"}
          sx={{ transform: "translateX(50%)" }}
          top={100}
        >
          <ScoreCircle score={userReview.rating} />
        </Box>
      )}
      {data?.poster_path && (
        <Box
          display={"flex"}
          width={1}
          bgcolor={"background.alt"}
          minHeight={300}
          flexWrap={"wrap"}
          mt={"180px"}
        >
          <PosterImage
            title={data?.title || data?.name}
            image={data.poster_path}
          />
          <TrailerSlider isMobile={isMobile} videos={data.videos?.results} />
        </Box>
      )}
      <Box bgcolor={"background.transparent"} p={isMobile ? 0 : 2}>
        <Box p={3} my={2} borderRadius={2} bgcolor={"background.alt"}>
          <MovieHeader data={data} />
        </Box>
        <Box display={"flex"} gap={2} minHeight={300} flexWrap={"wrap"}>
          <Overview data={data} />
          <ImageSlider
            images={[...data?.images?.backdrops, ...data?.images?.posters]}
          />
        </Box>

        <CastScroller cast={data.credits.cast} />

        <Providers data={data} />

        <MovieScroller title="Similar Movies" data={data.similar.results} />
        <Reviews user={user} />
      </Box>
    </ShowcaseLayout>
  );
};

const PosterImage = ({ title, image }) => (
  <Box
    component={"img"}
    src={"https://image.tmdb.org/t/p/w1280/" + image}
    alt={title + "-poster"}
    sx={{
      objectFit: "contain",
      objectPosition: "center",
      zIndex: 0,
      maxHeight: 450,
      minHeight: 200,
      maxWidth: 300,
      minWidth: 200,
      width: "40%",
      flexShrink: 1,
      mx: "auto",
    }}
  />
);

export default MoviePage;

export const loader = async ({ request }) => {
  const id = new URL(request.url).searchParams.get("id");
  try {
    const response = await GetFetch(`movie?id=${id}`);

    if (response.status !== 200) {
      return { error: "Unable to load movie data." };
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: "Unable to load movie data." };
  }
};
