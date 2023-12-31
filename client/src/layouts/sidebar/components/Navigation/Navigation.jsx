import {
  Bookmark,
  CalendarMonth,
  Explore,
  FavoriteBorder,
  WatchLater,
} from "@mui/icons-material";
import { Box, MenuList } from "@mui/material";
import { Transition } from "react-transition-group";

import NavigationItem from "./NavigationItem";

const Navigation = ({ isOpen, showFollowsIcon, isAuth }) => {
  return (
    <>
      <StyledMenu isOpen={isOpen}>
        <NavigationItem
          to={"/"}
          isAuth={isAuth}
          text="Browse"
          icon={<Explore />}
          showText={isOpen}
        />
        <NavigationItem
          to={"/favorites"}
          isAuth={isAuth}
          text="Favorites"
          icon={<FavoriteBorder />}
          showText={isOpen}
        />
        <NavigationItem
          to={"/watchlist"}
          isAuth={isAuth}
          text="Watchlist"
          icon={<WatchLater />}
          showText={isOpen}
        />
        <NavigationItem
          to={"/comingsoon"}
          isAuth={isAuth}
          text="Coming Soon"
          icon={<CalendarMonth />}
          showText={isOpen}
        />

        <Transition
          in={!showFollowsIcon}
          unmountOnExit
          mountOnEnter
          timeout={600}
        >
          {(state) => (
            <NavigationItem
              to={"/following"}
              text="Following"
              icon={<Bookmark />}
              showText={state === "entered" && isOpen}
              sx={{
                opacity: state === "entered" ? 1 : 0,
                ml: state === "entered" ? 0 : -20,
                transition: "all 0.6s ease-in-out",
              }}
            />
          )}
        </Transition>
      </StyledMenu>
      <Box height={220} />
    </>
  );
};

export default Navigation;

export const StyledMenu = (props) => (
  <MenuList
    sx={{
      position: "absolute",
      top: props.isOpen ? "6rem" : "50%",
      width: "100%",
      transform: props.isOpen ? "translateY(0)" : "translateY(-50%)",
      li: {
        px: 5,
        py: 2,
        borderLeft: "2px solid transparent",
        color: "neutral.medium",
      },
      svg: {
        color: "neutral.medium",
      },
      ">.Mui-selected": {
        bgcolor: "transparent !important",
        borderLeft: `2px solid`,
        borderColor: "primary.main",
        color: "neutral.dark",
        svg: {
          color: "primary.main",
        },
      },
      transition: "all 1s ease-in-out",
      ...props.sx,
    }}
  >
    {props.children}
  </MenuList>
);
