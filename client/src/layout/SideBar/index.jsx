import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Close, Logout } from "@mui/icons-material";

import Navigation, { StyledMenu } from "./Navigation/Navigation";
import Followers from "./Followers/Followers";
import NavigationItem from "./Navigation/NavigationItem";
import logo from '@/assets/r8hub_Logo_Light.svg'

const SideBar = ({ isOpen, onClick, isMobile }) => {
  const followerShowingQuery = useMediaQuery("(min-height:720px)");
  const showFollowers = followerShowingQuery && isOpen;

  return (
    <Box
      height="100%"
      position={"relative"}
      borderRight="1px solid"
      borderColor="neutral.light"
    >
      <Box
        sx={{
          height: "6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ml: isOpen ? 5 : 1.75,
          pr:2,
          transition: "margin 0.6s ease-in-out",
        }}
      >
      <Box src={logo} alt="R8" height={50} width={70} component={'img'}
         sx={{ "&:hover": { cursor: "pointer" }, alignContent: "center" }}
      />
        {isMobile && (
          <IconButton onClick={onClick}>
            <Close />
          </IconButton>
        )}
      </Box>

      <Navigation showFollowsIcon={showFollowers} isOpen={isOpen} />

      {/* Following section */}
      <Followers showFollowList={showFollowers} />

      {/* Logout Section */}

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
