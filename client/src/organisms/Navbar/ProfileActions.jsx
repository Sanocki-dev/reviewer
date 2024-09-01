import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, ListItemIcon, MenuItem, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AccountBox,
  DarkMode,
  Explore,
  LightMode,
  List,
  Login,
  Logout,
  Menu,
  Notifications,
  Person,
} from "@mui/icons-material";

import FlexRow from "@/atoms/FlexRow";
import { setMode, triggerLogout } from "@/context";
import MenuPopup from "@/atoms/MenuPopup";
import LoginModal from "@/organisms/Auth/LoginModal";
import Action from "@/atoms/Button";

const ProfileActions = () => {
  const { mode, user } = useSelector((state) => state);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [openForm, setOpenForm] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const open = Boolean(anchor);

  const changeThemeHandler = () => {
    dispatch(setMode());
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!anchor) setAnchor(e.currentTarget);
    else setAnchor(null);
  };

  const onRedirectHandler = (e) => {
    navigate(e.target.id);
  };

  return (
    <Container isMobile={isMobile}>
      {!isMobile && (
        <Action
          variant="text"
          disabled={false}
          tooltip="Change website theme"
          startIcon={mode === "light" ? <DarkMode /> : <LightMode />}
          onClick={changeThemeHandler}
        />
      )}
      <Action
        onClick={toggleMenu}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disabled={false}
        variant="text"
        text={isMobile ? "" : "Account"}
        tooltip="Account and Navigation"
        startIcon={<Person />}
        collapse={1}
      />
      <MenuPopup anchor={anchor} open={open} toggle={toggleMenu}>
        {user && (
          <Box>
            <MenuItem onClick={() => navigate(`/profile?userName=${user?.userName}`)}>
              <ListItemIcon>
                <AccountBox fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => navigate(`/profile?userName=${user?.userName}`)}>
              <ListItemIcon>
                <Notifications fontSize="small" />
              </ListItemIcon>
              Notifications
            </MenuItem>
            <Divider />
          </Box>
        )}

        <MenuItem id="home" onClick={onRedirectHandler}>
          <ListItemIcon>
            <Explore fontSize="small" />
          </ListItemIcon>
          Browse
        </MenuItem>
        <MenuItem disabled={!user} id="watchlist" onClick={onRedirectHandler}>
          <ListItemIcon>
            <List fontSize="small" />
          </ListItemIcon>
          Watchlists
        </MenuItem>
        <Divider />
        <MenuItem onClick={changeThemeHandler}>
          <ListItemIcon>
            {mode === "light" ? (
              <DarkMode fontSize="small" />
            ) : (
              <LightMode fontSize="small" />
            )}
          </ListItemIcon>
          Theme
        </MenuItem>
        {user ? (
          <MenuItem onClick={() => dispatch(triggerLogout())}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <MenuItem onClick={() => setOpenForm(true)}>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </MenuPopup>
      <LoginModal open={openForm} close={() => setOpenForm(false)} />
    </Container>
  );
};

export default ProfileActions;

{
  /* <MenuItem onClick={() => setOpenForm(true)}>
<ListItemIcon>
  <Login fontSize="small" />
</ListItemIcon>
Login
</MenuItem> */
}

const Container = (props) => (
  <FlexRow
    sx={{
      justifyContent: "flex-end",
      alignItems: "center",
      px: props.isMobile ? 0 : 2,
      // width: 80,
    }}
  >
    {props.children}
  </FlexRow>
);
