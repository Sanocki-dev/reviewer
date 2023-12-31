import { Box, Chip, Typography, Stack, Skeleton, Link } from "@mui/material";
import { genres } from "@/data/Genres";
import { useDispatch, useSelector } from "react-redux";
import ProviderChips from "./ProviderChips";
import { useNavigate } from "react-router-dom";
import { setMovie } from "@/context";

const Details = ({ data, isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const area = useSelector((state) => state.area);

  if (!data)
    return (
      <Box width={1} ml={3}>
        <Skeleton width={200} height={40}></Skeleton>
        <Skeleton width={240} height={20} sx={{ mt: 0 }}></Skeleton>
        <Stack direction={"row"} gap={1}>
          <Skeleton width={40} height={40}></Skeleton>
          <Skeleton width={40} height={40}></Skeleton>
          <Skeleton width={40} height={40}></Skeleton>
        </Stack>
        <Skeleton width={"80%"} height={100} sx={{ mt: -2 }}></Skeleton>
        <Skeleton width={80} height={20} sx={{ mt: -1 }}></Skeleton>
        <Stack direction={"row"} gap={1}>
          <Skeleton width={40} height={40}></Skeleton>
          <Skeleton width={40} height={40}></Skeleton>
          <Skeleton width={40} height={40}></Skeleton>
          <Skeleton width={40} height={40}></Skeleton>
          <Skeleton width={40} height={40}></Skeleton>
          <Skeleton width={40} height={40}></Skeleton>
        </Stack>
      </Box>
    );

  const {
    title,
    release_date,
    genre_ids,
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

  const onClickHandler = () => {
    navigate({ pathname: "/movie", search: "?id=" + data?.id });
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      width={1}
      flex={1}
      pt={isMobile ? 1 : 0}
      px={isMobile ? 3 : 2}
    >
      <Stack direction={"row"} alignItems={"flex-end"} gap={2}>
        <Typography variant="h4">{title}</Typography>
        <Link underline="hover" onClick={onClickHandler}>
          View more...
        </Link>
      </Stack>

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

      <Box display="flex" flexWrap={"wrap"} gap={2} my={1}>
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
