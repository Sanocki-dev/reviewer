import { Box } from "@mui/material";

import SearchBar from "./SearchBar";
import SidebarControls from "./SidebarControls";
// import ProfileActions from "./ProfileActions";

const NavBar = () => {
  return (
    <Box
      sx={{
        height: "6rem",
        display: "flex",
        alignItems: "center",
        pr: 4,
      }}
    >
      <SidebarControls />

      <Box
        display="flex"
        width="100%"
        alignItems="center"
        gap={3}
        justifyContent={"space-between"}
      >
        <SearchBar />
        {/* <ProfileActions /> */}
      </Box>
    </Box>
  );
};

export default NavBar;
