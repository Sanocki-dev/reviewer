import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Close, Logout, Menu } from "@mui/icons-material";

import Navigation, { StyledMenu } from "./Navigation/Navigation";
import Followers from "./Followers/Followers";
import NavigationItem from "./Navigation/NavigationItem";

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
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 1.25rem, 1.5rem)"
          sx={{ "&:hover": { cursor: "pointer" }, alignContent: "center" }}
        >
          R8.
          <Box component={"span"} sx={{ color: "primary.main" }}>
            hub
          </Box>
        </Typography>
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
