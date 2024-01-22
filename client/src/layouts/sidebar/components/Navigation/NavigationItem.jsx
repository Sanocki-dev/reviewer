import { ListItemIcon, ListItemText, MenuItem, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavigationItem = ({ text, icon, url, disabled, onClick }) => {
  const selected = window.location.pathname.toLowerCase();
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(url);
    onClick()
  };

  return (
    <Tooltip title={text} placement="right">
      <MenuItem
        disabled={disabled}
        selected={selected === url}
        onClick={onClickHandler}
        sx={{
          borderBottom: "1px solid",
          borderColor: selected === url ? "primary.main" : "transparent",
          color: selected === url ? "primary.main" : "",
          py: 3,
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </MenuItem>
    </Tooltip>
  );
};

export default NavigationItem;
