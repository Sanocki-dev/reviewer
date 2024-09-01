import { Box } from "@mui/material";

import SearchBar from "@/components/form/SearchBar";
import SidebarControls from "./components/SidebarControls";
import ProfileActions from "./components/ProfileActions";

const NavBar = () => {
  return (
    <Box
      sx={{
        height: "6rem",
        display: "flex",
      }}
    >
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        gap={3}
        justifyContent={"space-between"}
      >
        <SearchBar />
        <ProfileActions />
        <SidebarControls />
      </Box>
    </Box>
  );
};

export default NavBar;
