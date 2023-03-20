import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavigationItem = ({ text, icon, to, showText, sx }) => {
  const selected = window.location.pathname.toLowerCase();
  const navigate = useNavigate();

  const transitionStyle = {
    opacity: showText ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  };


  return (
    <MenuItem selected={selected === to} onClick={() => navigate(to)} sx={sx}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText sx={transitionStyle}>{text}</ListItemText>
    </MenuItem>
  );
};

export default NavigationItem;
