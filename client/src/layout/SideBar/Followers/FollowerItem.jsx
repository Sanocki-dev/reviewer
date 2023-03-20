import { Avatar, Box, ListItemAvatar, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FollowerItem = ({ id, name, avatar }) => {
  const navigate = useNavigate();

  return (
    <MenuItem onClick={() => navigate(`/${id}`)}>
      <ListItemAvatar>
        <Avatar
          sx={{
            height: 30,
            width: 30,
            border: `1px solid`,
            borderColor: "primary.main",
          }}
          alt={name}
          src={avatar}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{
          color: "neutral.medium",
        }}
      >
        {name.slice(0, 11)}
        {name.length > 11 && " ..."}
      </ListItemText>
      <ListItemIcon>
        <Box
          sx={{
            width: 4,
            height: 4,
            borderRadius: 20,
            bgcolor: "#04dd77",
            mx: "auto",
          }}
        />
      </ListItemIcon>
    </MenuItem>
  );
};

export default FollowerItem;
