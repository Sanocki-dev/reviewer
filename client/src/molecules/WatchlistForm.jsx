import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Check, List, PlaylistAdd } from "@mui/icons-material";
import Action from "@/atoms/Button";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

import Modal from "@/templates/Modal";
import CreateWatchlistForm from "./CreateWatchlistForm";
import { GetPatch } from "@/utils/getFetch";
import { updateUser } from "@/context";

const WatchlistForm = ({ user }) => {
  const { id, title } = useLoaderData();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = async (listId) => {
    try {
      let { data } = await GetPatch(`/watchlist/${user.id}/${listId}`, {
        movie: { id, title },
      });

      dispatch(updateUser({ type: "watchlists", data }));

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = () => {
    setModalOpen(true);
    setAnchorEl(null);
  };

  return (
    <>
      <Action
        id="Watchlist-button"
        aria-controls={open ? "watchlist-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        tooltip="Add to a watchlist"
        onClick={handleClick}
        startIcon={<List />}
        text={"Watchlist"}
      />
      <Menu
        id="watchlist-menu"
        MenuListProps={{
          "aria-labelledby": "watchlist-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {user?.watchlists?.map(({ _id, name, movies, genre }) => (
          <MenuItem key={_id} onClick={() => handleAdd(_id)} disableRipple>
            {name}
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: -5,
                width: 200,
                overflow: "hidden",
              }}
            >
              {genre.join(", ")}
            </Typography>
            {movies.findIndex((movie) => movie.id === id) !== -1 ? (
              <ListItemIcon sx={{ ml: "auto" }}>
                <Check fontSize="small" />
              </ListItemIcon>
            ) : null}
          </MenuItem>
        ))}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={openModal}
          disableRipple
          disabled={user?.watchlists?.length === 4}
          sx={{ width: 230 }}
        >
        
          Add to new watchlist
          {user?.watchlists?.length === 4 ? (
            <Typography
              variant="caption"
              sx={{ position: "absolute", bottom: -5 }}
            >
              You have reached the limit for watchlists!
            </Typography>
          ) : (
            ""
          )}
          <ListItemIcon  sx={{ ml: "auto" }}>
            <PlaylistAdd fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
      <Modal open={modalOpen} handleClose={() => setModalOpen(false)} noCenter>
        <CreateWatchlistForm
          user={user}
          handleClose={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default WatchlistForm;
