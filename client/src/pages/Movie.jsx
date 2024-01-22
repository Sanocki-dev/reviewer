import { useLoaderData } from "react-router-dom";
import { Box, alpha, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import TrailerSlider from "@/molecules/TrailerSlider";
import ImageSlider from "@/molecules/ImageSlider";

import Reviews from "@/organisms/Movie/Reviews";
import Providers from "@/organisms/Movie/Providers";
import Overview from "@/organisms/Movie/Overview";
import MovieHeader from "@/organisms/Movie/MovieHeader";
import { GetFetch } from "@/utils/getFetch";

const MoviePage = () => {
  const data = useLoaderData();
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      p={isMobile ? 0 : 3}
      py={5}
      width={isMobile ? "100%" : "80%"}
      minWidth={270}
      mx="auto"
      bgcolor={alpha(palette.background.default, 0.5)}
    >
      <Box px={isMobile ? 2 : 0}>
        <MovieHeader data={data} />
      </Box>
      <Box
        display={"flex"}
        width={1}
        bgcolor={"background.alt"}
        minHeight={300}
        flexWrap={"wrap"}
      >
        <PosterImage image={data.poster_path} />
        <TrailerSlider isMobile={isMobile} videos={data.videos?.results} />
      </Box>

      <Box mt={2} display={"flex"} gap={2} minHeight={300} flexWrap={"wrap"}>
        <Overview data={data} />
        <ImageSlider
          images={[...data?.images?.backdrops, ...data?.images?.posters]}
        />
      </Box>

      <Providers data={data} />
      <Reviews reviews={data.reviews} user={user} />
    </Box>
  );
};

const PosterImage = ({ image }) => (
  <Box
    component={"img"}
    src={"https://image.tmdb.org/t/p/w1280/" + image}
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
    return { error: "Unable to load movie data." };
  }
};
