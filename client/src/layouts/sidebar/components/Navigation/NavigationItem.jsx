import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toggleSidebar } from "@/context";

const NavigationItem = ({
  text,
  icon,
  to,
  showText,
  sx,
  isAuth,
  onClick = null,
}) => {
  const selected = window.location.pathname.toLowerCase();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const smQuery = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const onClickHandler = () => {
    if (smQuery) dispatch(toggleSidebar());
    if (Boolean(to)) navigate(to);
    if (Boolean(onClick)) onClick();
  };

  const activeItem =
    isAuth || text == "Login" || text == "Logout" || text == "Browse" || text=='Home';

  return (
    <Tooltip disableHoverListener={showText} title={text} placement="right">
      <MenuItem
        disabled={!activeItem}
        selected={selected === to}
        onClick={onClickHandler}
        sx={sx}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          sx={{
            opacity: showText ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {text}
        </ListItemText>
      </MenuItem>
    </Tooltip>
  );
};

export default NavigationItem;
