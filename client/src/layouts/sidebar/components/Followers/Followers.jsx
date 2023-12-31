import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Transition } from "react-transition-group";

import FollowerItem from "./FollowerItem";
import { useSelector } from "react-redux";

const Followers = ({ showFollowList }) => {
  const [showAll, setShowAll] = useState(false);
  const friends = useSelector((state) => state.user.friends);

  const people = showAll ? friends : friends.slice(0, 5);

  return (
    <Transition in={showFollowList} timeout={600} unmountOnExit mountOnEnter>
      {(showList) => (
        <>
          <StyledDivider showing={showList === "entered"} />
          <Typography
            sx={{
              color: "neutral.medium",
              fontWeight: "bold",
              fontSize: 12,
              pb: 1,
              ml: showList === "entered" ? 4 : -20,
              opacity: showList === "entered" ? 1 : 0,
              transition: "all .8s ease-in-out",
            }}
          >
            Following - {friends.length} people
          </Typography>
          <StlyedList state={showList}>
            {people.slice(0, 8).map(({ id, userName, picturepath }) => (
              <FollowerItem
                key={id}
                id={id}
                name={userName}
                avatar={picturepath}
              />
            ))}

            {friends.length > 5 && (
              <MenuItem
                sx={{ mt: 3 }}
                onClick={() => setShowAll((state) => !state)}
              >
                <ListItemIcon>
                  {showAll ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    py: 1,
                    fontSize: 12,
                    color: "neutral.medium",
                    span: { fontWeight: "500" },
                  }}
                >
                  {showAll ? "Show Less" : `Show ${friends.length - 10} More`}
                </ListItemText>
              </MenuItem>
            )}
          </StlyedList>
          <StyledDivider showing={showList === "entered"} />
        </>
      )}
    </Transition>
  );
};

export default Followers;

const StyledDivider = ({ showing, sx, mt = 2 }) => (
  <Divider
    sx={{
      mt: mt,
      mb: 4,
      mx: 5,
      borderColor: "neutral.light",
      opacity: showing ? 1 : 0,
      transition: "all .5s ease-in-out",
      ...sx,
    }}
  />
);

const StlyedList = ({ state, children }) => (
  <MenuList
    sx={{
      height: state === "exiting" ? "0%" : state === "entered" && "35%",
      opacity: state === "entered" ? 1 : 0,
      maxHeight: "40%",
      overflowY: "auto",
      minWidth: 245,
      overflowX: "hidden",
      li: {
        px: 5,
        py: 1,
      },
      "&::-webkit-scrollbar": {
        width: "0.3em",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: `inset 0 0 6px black`,
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: 4,
        backgroundColor: "neutral.medium",
      },
      transition: "all .8s ease-in-out",
    }}
  >
    {children}
  </MenuList>
);
