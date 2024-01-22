import { Box, IconButton } from "@mui/material";
import NavigationItem from "@/layouts/sidebar/components/Navigation/NavigationItem";
import Logo from "@/atoms/Logo";
import { Close } from "@mui/icons-material";

const SideBar = ({ isOpen, links, onClose }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 100,
        bgcolor: "background.alt",
        height: "100vh",
        overflow: "hidden",
        left: 0,
        width: !isOpen ? 0 : "100%",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.6s ease-in-out",
      }}
    >
      <Box display={"flex"} alignItems={"center"} p={3}>
        <Logo />
        <IconButton sx={{ ml: "auto" }} onClick={onClose}>
          <Close sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>

      {links.map(({ id, name, url, icon, disabled }) => (
        <NavigationItem
          key={id}
          url={url}
          text={name}
          icon={icon}
          disabled={disabled}
          onClick={onClose}
        />
      ))}
    </Box>
  );
};

export default SideBar;
