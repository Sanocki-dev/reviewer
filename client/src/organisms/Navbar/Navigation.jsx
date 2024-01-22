import { IconButton, MenuItem, MenuList, useMediaQuery } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import FlexRow from "@/atoms/FlexRow";
import { Explore, MoreVert, WatchLater } from "@mui/icons-material";

import ClickableLogo from "@/molecules/ClickableLogo";
import SideBar from "@/organisms/Navbar/Sidebar";

const Navigation = () => {
  const selected = window.location.pathname.toLowerCase();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const token = useLoaderData();
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
      disabled: !Boolean(token),
      icon: <WatchLater />,
    },
  ];

  if (isMobile)
    return (
      <>
        <IconButton sx={{ pl: 3, pr: 2 }} onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <SideBar isOpen={open} onClose={handleClose} links={links} />
      </>
    );

  return (
    <FlexRow>
      <ClickableLogo />
      <MenuList sx={{ display: "flex" }}>
        {links.map(({ id, name, url, disabled }) => (
          <MenuItem
            key={id}
            id={id}
            onClick={onRedirectHandler}
            selected={selected === url}
            disabled={disabled}
          >
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </FlexRow>
  );
};

export default Navigation;
