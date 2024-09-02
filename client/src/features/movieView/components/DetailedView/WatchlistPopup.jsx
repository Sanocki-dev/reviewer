import { PlaylistAdd } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";

import { updateUser } from "@/context";

const WatchlistPopup = ({ isOpen, handleClose, anchorEl, movie }) => {
  const [watchlistName, setWatchlistName] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClickHandler = (e) => {
    if (e.target.id[0] === "w") handleClose();
    e.preventDefault();
  };

  const onKeyDownHandler = (e) => {
    e.stopPropagation();
  };

  const onChangeHandler = (e) => {
    setWatchlistName(e.target.value);
  };

  const onCreateHandler = async () => {
    //import.meta.env.VITE_SITE_URL
    //"http://localhost:8888/"
    let { data } = await axios.post(
      import.meta.env.VITE_SITE_URL + "watchList",
      {
        userId: user.id,
        name: watchlistName,
        movieId: {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        },
      }
    );
    dispatch(updateUser({ type: "watchlists", data }));
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="watchlist-menu"
      open={isOpen}
      onClose={handleClose}
      onClick={onClickHandler}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {user?.watchlists?.map(({ name }, index) => (
        <MenuItem id={`w-${index}`}>{name}</MenuItem>
      ))}

      <Divider />
      <MenuItem id="watchlist-name">
        <Typography mr={2}>Create New</Typography>
        <PlaylistAdd />
      </MenuItem>
    </Menu>
  );
};

export default WatchlistPopup;
