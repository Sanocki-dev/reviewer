import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton, MenuItem, Tooltip } from "@mui/material";

import FlexRow from "./FlexRow";
import { setMode } from "@/context";
import { useState } from "react";
import MenuPopup from "./MenuPopup";
import { useLoaderData } from "react-router-dom";

const ProfileActions = () => {
  const { mode, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = useLoaderData();
  const [anchor, setAnchor] = useState(null);

  const open = Boolean(anchor);

  const changeThemeHandler = () => {
    dispatch(setMode());
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!anchor) setAnchor(e.currentTarget);
    else setAnchor(null);
  };

  return (
    <Container>
      <Tooltip title="Account settings">
        <IconButton
          disableRipple
          onClick={toggleMenu}
          size={"small"}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32, textTransform: "uppercase" }}>
            {user?.userName[0]}
          </Avatar>
        </IconButton>
      </Tooltip>
      <MenuPopup anchor={anchor} open={open} toggle={toggleMenu}>
        {token && <MenuItem>Profile</MenuItem>}
        <MenuItem
          sx={{ textTransform: "capitalize" }}
          onClick={changeThemeHandler}
        >
          Theme: {mode}
        </MenuItem>
        <MenuItem>Login</MenuItem>
      </MenuPopup>
    </Container>
  );
};

export default ProfileActions;

const Container = (props) => (
  <FlexRow
    sx={{
      justifyContent: "flex-end",
      flex: 1,
      px: 3,
      gap: 3,
    }}
  >
    {props.children}
  </FlexRow>
);