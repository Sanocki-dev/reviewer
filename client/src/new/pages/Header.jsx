import { Box } from "@mui/material";

import Navigation from "./Navigation";
import Search from "./Search";
import ProfileActions from "./ProfileActions";
import FlexRow from "./FlexRow";
import Modal from "./Modal";

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
      width: 1,
      height: 50,
      my: 3,
      px: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      zIndex:2
    }}
  >
    {props.children}
  </Box>
);

const Inner = (props) => (
  <FlexRow
    component="nav"
    sx={{
      borderRadius: 2,
      height: 1,
      width: "80%",
      bgcolor: "background.default",
    }}
  >
    {props.children}
  </FlexRow>
);
