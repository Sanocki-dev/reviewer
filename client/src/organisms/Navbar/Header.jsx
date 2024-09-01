import { Box } from "@mui/material";

import Search from "./Search";
import ProfileActions from "./ProfileActions";
import FlexRow from "@/atoms/FlexRow";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <Container>
      <Inner>
        <Navigation />
        <Search />
        <ProfileActions />
      </Inner>
    </Container>
  );
};

export default Header;

const Container = (props) => (
  <Box
    component="nav"
    sx={{
      position: "sticky",
      width: 1,
      height: 55,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
      top: 0,
      left: 0,
      boxShadow: "0px -4px 20px 6px rgba(0,0,0,0.63)",
    }}
  >
    {props.children}
  </Box>
);

const Inner = (props) => (
  <FlexRow
    sx={{
      height: 1,
      width: 1,
      bgcolor: "background.alt",
      alignItems: "center",
      px: 3,
    }}
  >
    {props.children}
  </FlexRow>
);
