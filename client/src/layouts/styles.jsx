import { Box, styled } from "@mui/material";

export const SidebarSx = styled(Box)(({ theme, open }) => {
  const width =
    open && theme.breakpoints.down("sm")
      ? "80%"
      : open
      ? 300
      : theme.breakpoints.down("sm")
      ? 0
      : 100;

  return theme.unstable_sx({
    width: width,
    bgcolor: "background.alt",
    height: theme.breakpoints.down("sm") ? "100vh" : "100%",
    zIndex: 100,
    overflow: "hidden",
    borderRight: "1px solid",
    pb: 10,
    borderColor: "neutral.light",
    transition: "all 1s ease-in-out",
    position: theme.breakpoints.down("sm") ? "absolute" : "relative",
  });
});
