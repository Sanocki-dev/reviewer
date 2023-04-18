import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";

import Navigation, { StyledMenu } from "./Navigation/Navigation";
import Followers from "./Followers/Followers";
import NavigationItem from "./Navigation/NavigationItem";
import logo from "/assets/r8hub_logo_light.svg";
import { useNavigate } from "react-router-dom";

const SideBar = ({ isOpen, onClick, isMobile }) => {
  const followerShowingQuery = useMediaQuery("(min-height:720px)");
  const navigate = useNavigate();
  const showFollowers = followerShowingQuery && isOpen;

  return (
    <Box
      height="100%"
      position={"relative"}
      borderRight="1px solid"
      borderColor="neutral.light"
      zIndex={3}
    >
      <Box
        sx={{
          height: "6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ml: isOpen ? 5 : 1.75,
          pr: 2,
          transition: "margin 0.6s ease-in-out",
        }}
      >
        <Box
          src={logo}
          alt="R8Logo"
          component={"img"}
          sx={{
            "&:hover": { cursor: "pointer" },
            alignContent: "center",
            width: 70,
            height: 50,
          }}
          onClick={() => navigate("/home")}
        />
        {isMobile && (
          <IconButton onClick={onClick}>
            <Menu />
          </IconButton>
        )}
      </Box>

      <Navigation showFollowsIcon={showFollowers} isOpen={isOpen} />
      <Followers showFollowList={showFollowers} />

      <StyledMenu
        sx={{
          position: "absolute",
          bottom: "-35px",
          top: "unset",
          width: "100%",
        }}
      >
        <NavigationItem
          to="/logout"
          text={"Log out"}
          icon={<Logout />}
          showText={isOpen}
        />
      </StyledMenu>
    </Box>
  );
};

export default SideBar;
