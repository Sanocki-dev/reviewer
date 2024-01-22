import { Box, Divider, Stack, Typography } from "@mui/material";
import MovieActions from "@/molecules/MovieActions";

const MovieName = ({ data }) => {
  const runtimeHours = Math.floor(data.runtime / 60);
  const runtimeMinutes = data.runtime - runtimeHours * 60;

  const rating = data.release_dates?.results
    .find(({ iso_3166_1 }) => iso_3166_1 == "US")
    ?.release_dates.find(({ certification }) => certification != "");

  return (
    <>
      <Box
        display="flex"
        flexWrap={"wrap"}
        width={1}
        justifyContent={"space-between"}
        alignItems={"baseline"}
        gap={1}
      >
        <Typography variant="h1" fontWeight="bold">
          {data.title}
        </Typography>
        <MovieActions id={data.id} title={data.title} />
      </Box>
      <Typography mt={1} variant="subtitle1" color="neutral.main">
        {data.tagline}
      </Typography>
      <Stack mb={2} direction={"row"} gap={1} alignItems="baseline">
        <Typography variant="h5">
          {data.release_date?.slice(0, 4) || "N/A"}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography
          variant="h5"
          borderRadius={2}
          border="1px solid"
          borderColor={"primary.main"}
          px={1}
        >
          {rating?.certification || "NR"}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography variant="h5">
          {runtimeHours}h {runtimeMinutes}m
        </Typography>
      </Stack>
    </>
  );
};

export default MovieName;
