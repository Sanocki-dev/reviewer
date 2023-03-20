import { Box, useTheme } from "@mui/material";

const SidebarSelection = () => {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;

  return (
    <Box
      sx={{
        bgcolor: primaryMain,
        width: "3px",
        height: "100%",
        borderRadius: "0 5px 5px 0",
      }}
    />
  );
};

export default SidebarSelection;
