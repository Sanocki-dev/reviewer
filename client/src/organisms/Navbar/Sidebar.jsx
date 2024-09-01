import { Backdrop, Box } from "@mui/material";
import { Close } from "@mui/icons-material";

import NavigationItem from "@/layouts/sidebar/components/Navigation/NavigationItem";

import Action from "@/atoms/Button";
import ClickableLogo from "@/molecules/ClickableLogo";

const SideBar = ({ isOpen, links, onClose }) => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          zIndex: 100,
          bgcolor: "background.alt",
          height: "100vh",
          overflow: "hidden",
          left: 0,
          width: !isOpen ? 0 : "70%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.6s ease-in-out",
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={3}
          zIndex={200}
        >
          <ClickableLogo />
          <Action
            tooltip="Close Menu"
            startIcon={<Close />}
            onClick={onClose}
          />
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
      <Backdrop open={isOpen} onClick={onClose} sx={{ zIndex: 2 }} />
    </>
  );
};

export default SideBar;
