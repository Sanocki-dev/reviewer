import {
  List,
  Star,
  StarBorder,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import { updateUser } from "@/context";
import WatchlistForm from "./WatchlistForm";
import Action from "@/atoms/Button";
import { GetPatch } from "@/utils/getFetch";
import { useLoaderData } from "react-router-dom";

const MovieActions = () => {
  const { id, title, poster_path } = useLoaderData();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const hasSeen = Boolean(user?.seen?.find((movie) => movie.id === id));
  const isFavorite = Boolean(user?.favorites?.find((movie) => movie.id === id));

  const onClickHandler = async (type) => {
    if (!user) return;

    const res = await GetPatch(`${user.id}/lists`, {
      id,
      title,
      type,
      poster_path,
    });

    dispatch(updateUser({ type, data: res.data }));
  };

  return (
    <Box display={"flex"} gap={2} flexWrap={"wrap"}>
      <WatchlistForm user={user} movie={id} />
    <Action
        tooltip={isFavorite ? "Remove from favorites" : "Add to favorites"}
        text={"Favorite"}
        variant="contained"
        onClick={() => onClickHandler("favorites")}
      >
        {isFavorite ? <Star sx={{ color: "gold" }} /> : <StarBorder />}
      </Action>
      <Action
        tooltip={hasSeen ? "Remove from seen" : "Add to seen"}
        text={"Watched"}
        variant="contained"
        onClick={() => onClickHandler("seen")}
      >
        {hasSeen ? <Visibility /> : <VisibilityOff />}
      </Action>
    </Box>
  );
};

export default MovieActions;
