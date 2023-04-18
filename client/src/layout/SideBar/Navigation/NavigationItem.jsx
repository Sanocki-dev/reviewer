import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toggleSidebar } from "@/store";

const NavigationItem = ({ text, icon, to, showText, sx }) => {
  const selected = window.location.pathname.toLowerCase();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const smQuery = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const onClickHandler = () => {
    if (smQuery) dispatch(toggleSidebar());
    navigate(to);
  };

  return (
    <MenuItem selected={selected === to} onClick={onClickHandler} sx={sx}>
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
  );
};

export default NavigationItem;
