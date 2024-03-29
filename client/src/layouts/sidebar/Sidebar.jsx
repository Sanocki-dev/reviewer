import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Login, Logout, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navigation, { StyledMenu } from "./components/Navigation/Navigation";
import Followers from "./components/Followers/Followers";
import NavigationItem from "./components/Navigation/NavigationItem";
import lightLogo from "@/assets/brand/r8_blue_new.svg";
import darkLogo from "@/assets/brand/r8_new_dark.svg";

import { toggleIsAuthenticating, triggerLogout } from "@/context";

const SideBar = ({ isOpen, onClick, isMobile }) => {
  const followerShowingQuery = useMediaQuery("(min-height:720px)");
  const { isAuth, mode } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showFollowers = followerShowingQuery && isOpen;

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
          src={mode !== "light" ? lightLogo : darkLogo}
          alt="R8Logo"
          component={"img"}
          sx={{
            "&:hover": { cursor: "pointer" },
            alignContent: "center",
            width: 70,
            height: 40,
            "& R8-R": {
              fill:'red'
            },
          }}
          onClick={() => navigate("/home")}
        />
        {isMobile && (
          <IconButton onClick={onClick}>
            <Menu />
          </IconButton>
        )}
      </Box>

      <Navigation
        isAuth={isAuth}
        showFollowsIcon={showFollowers}
        isOpen={isOpen}
      />
      {isAuth && <Followers showFollowList={showFollowers} />}

      <StyledMenu
        sx={{
          position: "absolute",
          bottom: "-35px",
          top: "unset",
          width: "100%",
        }}
      >
        {isAuth ? (
          <NavigationItem
            onClick={() => dispatch(triggerLogout())}
            text={"Logout"}
            icon={<Logout />}
            isAuth={true}
            showText={isOpen}
          />
        ) : (
          <NavigationItem
            text={"Login"}
            onClick={() => dispatch(toggleIsAuthenticating())}
            icon={<Login />}
            showText={isOpen}
          />
        )}
      </StyledMenu>
    </>
  );
};

export default SideBar;
