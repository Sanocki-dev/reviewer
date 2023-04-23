import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Navigation, { StyledMenu } from "./components/Navigation/Navigation";
import Followers from "./components/Followers/Followers";
import NavigationItem from "./components/Navigation/NavigationItem";
import logo from "@/assets/brand/r8hub_logo_light.svg";

const SideBar = ({ isOpen, onClick, isMobile }) => {
  const followerShowingQuery = useMediaQuery("(min-height:720px)");
  const addPadding = useMediaQuery("(max-width:400px)");
  const navigate = useNavigate();
  const showFollowers = followerShowingQuery && isOpen;
  console.log(addPadding);

  return (
    <>
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
    </>
  );
};

export default SideBar;
