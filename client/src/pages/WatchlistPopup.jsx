import { PlaylistAdd } from "@mui/icons-material";
import { Divider, IconButton, InputBase, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

const WatchlistPopup = ({ isOpen, handleClose, anchorEl, movie }) => {
  const [watchlistName, setWatchlistName] = useState();
  const user = useSelector((state) => state.user);

  const onClick = (e) => {
    if (e.target.id[0] === "w") handleClose();
    e.preventDefault();
  };

  const onKeyDown = (e) => {
    e.stopPropagation();
    setWatchlistName(e.target.value);
  };

  const onCreateHandler = async () => {
    let res = await axios.post(import.meta.env.VITE_SITE_URL + "watchList", {
      userId: user.id,
      name: watchlistName,
      movieId: {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      },
    });
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="watchlist-menu"
      open={isOpen}
      onClose={handleClose}
      onClick={onClick}
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
      <MenuItem id="w-0">Horror</MenuItem>
      <MenuItem id="w-1">Fantasy</MenuItem>
      <MenuItem id="w-2">Comendy</MenuItem>

      <Divider />
      <MenuItem id="watchlist-name">
        <Form onSubmit={onCreateHandler}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="New Watchlist"
            inputProps={{ "aria-label": "create new watchlist" }}
            onKeyDown={onKeyDown}
          />
        </Form>
        <IconButton type="submit" onClick={onCreateHandler}>
          <PlaylistAdd />
        </IconButton>
      </MenuItem>
    </Menu>
  );
};

export default WatchlistPopup;
