import { Box } from "@mui/material";
import {
  FavoriteBorder,
  FavoriteOutlined,
  Visibility,
  VisibilityOutlined,
  WatchLater,
} from "@mui/icons-material";

import ScoreCircle from "../ScoreCircle";
import ActionBtn from "./ActionBtn";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/context";
import WatchlistPopup from "@/pages/WatchlistPopup";
import { useState } from "react";

const Actions = ({ data }) => {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClickHandler = async (type) => {
    if (!user) return;
    const res = await axios.patch(`${import.meta.env.VITE_SITE_URL}/${user.id}/lists`, {
      movieId: data?.id,
      title: data?.title,
      poster_path: data?.poster_path,
      type,
    });
    dispatch(updateUser({ type, data: res.data }));
  };

  let isFavorite = user?.favorites.find((item) => item.id === data?.id);
  let isSeen = user?.seen.find((item) => item.id === data?.id);

  return (
    <Box display="flex" flexDirection={"column"} alignItems="center">
      {/* <ScoreCircle score={data.vote_average} total={data.vote_count} isPlaced /> */}
      <ActionBtn
        tooltip="Add to watch list"
        icon={<WatchLater />}
        onClick={handleClick}
        aria-controls={isOpen ? "watchlist-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
      />
      <WatchlistPopup
        movie={data}
        anchorEl={anchorEl}
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <ActionBtn
        tooltip="Add to favorites"
        icon={
          isFavorite ? (
            <FavoriteOutlined sx={{ color: "red" }} />
          ) : (
            <FavoriteBorder />
          )
        }
        onClick={() => onClickHandler("favorites")}
      />
      <ActionBtn
        tooltip="Add to seen list"
        icon={
          isSeen ? (
            <Visibility sx={{ color: "primary.main" }} />
          ) : (
            <VisibilityOutlined />
          )
        }
        onClick={() => onClickHandler("seen")}
      />
    </Box>
  );
};

export default Actions;
