import {
  List,
  Star,
  StarBorder,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { updateUser } from "@/context";
import WatchlistForm from "./WatchlistForm";
import Action from "@/atoms/Button";

const MovieActions = ({ id, title }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const hasSeen = Boolean(user?.seen?.find((movie) => movie.id === id));
  const isFavorite = Boolean(user?.favorites?.find((movie) => movie.id === id));

  const onClickHandler = async (type) => {
    if (!user) return;
    const res = await axios.patch(
      `${import.meta.env.VITE_SITE_URL}/${user.id}/lists`,
      {
        movieId: id,
        title,
        type,
      }
    );
    dispatch(updateUser({ type, data: res.data }));
  };

  const toggleModal = () => {
    setOpen((state) => !state);
  };

  return (
    <Box display={"flex"} gap={2} flexWrap={"wrap"}>
      <Action text={"Watchlist"} onClick={toggleModal}>
        <List />
      </Action>
      <WatchlistForm
        user={user}
        movie={id}
        open={open}
        close={() => setOpen(!open)}
      />
      <Action
        tooltip={isFavorite ? "Remove from favorites" : "Add to favorites"}
        text={"Favorite"}
        onClick={() => onClickHandler("favorites")}
      >
        {isFavorite ? <Star sx={{ color: "gold" }} /> : <StarBorder />}
      </Action>
      <Action
        tooltip={hasSeen ? "Remove from seen" : "Add to seen"}
        text={"Seen"}
        onClick={() => onClickHandler("seen")}
      >
        {hasSeen ? <Visibility /> : <VisibilityOff />}
      </Action>
    </Box>
  );
};

export default MovieActions;
