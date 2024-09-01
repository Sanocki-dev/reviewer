import { Box, MenuItem, MenuList, useMediaQuery } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import FlexRow from "@/atoms/FlexRow";
import { Explore, Menu, WatchLater } from "@mui/icons-material";

import ClickableLogo from "@/molecules/ClickableLogo";
import SideBar from "@/organisms/Navbar/Sidebar";
import Action from "@/atoms/Button";
import { useSelector } from "react-redux";

const Navigation = () => {
  const selected = window.location.pathname.toLowerCase();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onRedirectHandler = (e) => {
    navigate(e.target.id);
  };

  const links = [
    { id: "browse", name: "Browse", url: "/browse", icon: <Explore /> },
    {
      id: "watchlist",
      name: "Watchlists",
      url: "/watchlist",
      isAuth: true,
      disabled: !Boolean(user),
      icon: <WatchLater />,
    },
  ];

  if (isMobile)
    return (
      <>
        <Action
          tooltip="Open Sidebar"
          sx={{ pl: 3, pr: 2 }}
          startIcon={<Menu />}
          disableRipple
          onClick={handleClick}
        />
        <SideBar isOpen={open} onClose={handleClose} links={links} />
      </>
    );

  return (
    <FlexRow>
      <ClickableLogo />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr:2 }}>
        {links.map(({ id, name, url, disabled }) => (
          <Action
            variant="text"
            key={id}
            id={id}
            onClick={onRedirectHandler}
            selected={selected === url}
            disabled={disabled}
          >
            {name}
          </Action>
        ))}
      </Box>
    </FlexRow>
  );
};

export default Navigation;
