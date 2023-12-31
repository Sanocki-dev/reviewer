import {
  DarkMode,
  LightMode,
  NotificationsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";

import { setMode } from "@/context";

const ProfileActions = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const mdQuery = useMediaQuery(theme.breakpoints.down("md"));

  // const showIcons = (state) => (
  //   <IconButtonNotifications state={state} notification={false}>
  //     <NotificationsOutlined />
  //   </IconButtonNotifications>
  // );

  return (
    <Box display="flex" mr={5} justifyContent={"space-between"} gap={3}>
      {/* <Transition in={!mdQuery} timeout={300} unmountOnExit mountOnEnter>
        {(state) => showIcons(state)}
      </Transition> */}

      <IconButton onClick={() => dispatch(setMode())}>
        {mode !== "dark" ? <DarkMode /> : <LightMode />}
      </IconButton>
      <StyledBox color={theme}>
        <Avatar
          sx={{ border: "4px solid", borderColor: "neutral.light" }}
          src="https://media.licdn.com/dms/image/C4D03AQH7Tzq_-BfZmg/profile-displayphoto-shrink_800_800/0/1654363545971?e=1684368000&v=beta&t=VhKDCxCuYVBrmc72KDPWrmBcP-SoZSw0w-5pl0DYMZ8"
        />
      </StyledBox>
    </Box>
  );
};

export default ProfileActions;

const IconButtonNotifications = ({ state, children, notification }) => (
  <IconButton
    disableRipple
    sx={{
      opacity: state === "entered" ? 1 : 0,
      transition: "opacity .5s ease-in-out",
    }}
  >
    <Badge invisible={notification} variant="dot" color="primary">
      {children}
    </Badge>
  </IconButton>
);

const StyledBox = ({ color, children }) => (
  <Box
    sx={{
      background:
        "linear-gradient(to right, " +
        color.palette.primary.main +
        ", " +
        color.palette.primary.light +
        ") border-box",
      borderRadius: "50em",
      border: "2px solid transparent;",
    }}
    borderRadius="50%"
  >
    {children}
  </Box>
);
