import { MenuItem, MenuList } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";

import FlexRow from "./FlexRow";
import ClickableLogo from "./ClickableLogo";

const Navigation = () => {
  const selected = window.location.pathname.toLowerCase();
  const token = useLoaderData();
  const navigate = useNavigate();

  const onRedirectHandler = (e) => {
    navigate(e.target.id);
  };

  const links = [
    { id: "", name: "Home", url: "/" },
    { id: "browse", name: "Browse", url: "/browse" },
    { id: "watchlist", name: "Watchlists", url: "/watchlist", isAuth: true },
  ];

  return (
    <FlexRow>
      <ClickableLogo />
      <MenuList sx={{ display: "flex", p: 0 }}>
        {links.map(({ id, name, url, isAuth }) => (
          <MenuItem
            key={id}
            id={id}
            onClick={onRedirectHandler}
            selected={selected === url}
            disabled={isAuth && !Boolean(token)}
          >
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </FlexRow>
  );
};

export default Navigation;
