import { Box, Chip, Typography, Stack } from "@mui/material";
import { genres } from "@/data/Genres";
import { useSelector } from "react-redux";
import ProviderChips from "./ProviderChips";

const Details = ({ data, isMobile }) => {
  const area = useSelector((state) => state.area);
  const {
    title,
    release_date,
    genres: genre_ids,
    overview,
    runtime,
    tagline,
    release_dates,
  } = data;

  const rating = release_dates?.results
    .find(({ iso_3166_1 }) => iso_3166_1 == area)
    ?.release_dates.find(({ certification }) => certification != "");
  const providers = data["watch/providers"]?.results[area];
  const runtimeHours = Math.floor(runtime / 60);
  const runtimeMinutes = runtime - runtimeHours * 60;

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      width={1}
      flex={1}
      pt={isMobile ? 1 : 0}
      px={isMobile ? 3 : 2}
    >
      <Typography variant="h4">{title}</Typography>
      <Typography variant="caption" color="neutral.main" fontSize={12}>
        {tagline}
      </Typography>
      <Stack direction={"row"} gap={1} alignItems="baseline">
        <Typography
          variant="subtitle1"
          borderRadius={2}
          border="1px solid"
          borderColor={"primary.main"}
          px={1}
        >
          {rating?.certification || "NR"}
        </Typography>
        <Typography variant="subtitle1">
          {release_date?.slice(0, 4) || "N/A"}
        </Typography>
        <Typography variant="subtitle1">
          {runtimeHours}h {runtimeMinutes}m
        </Typography>
      </Stack>

      <Box display='flex' gap={2} my={1}>
        {genre_ids?.map(({ id }) => (
          <Chip
            key={id + "-title"}
            size="small"
            label={genres.find((genre) => genre.id == id).name}
          />
        ))}
      </Box>

      <Typography fontWeight="light">
        {overview?.length > 400
          ? overview.slice(0, 400) + " ..."
          : overview || "No overview is avaliable for this title."}
      </Typography>

      <ProviderChips provider={providers?.buy} title={"Rent / Buy"} />
      <ProviderChips provider={providers?.flatrate} title={"Stream"} />
    </Box>
  );
};

export default Details;
