import { Box } from "@mui/material";

import Navigation from "./Navigation";
import Search from "./Search";
import ProfileActions from "./ProfileActions";
import FlexRow from "../../atoms/FlexRow";

const Header = () => {
  return (
    <>
      <Container>
        <Inner>
          <Navigation />
          <Search />
          <ProfileActions />
        </Inner>
      </Container>
      <Box height={50} />
    </>
  );
};

export default Header;

const Container = (props) => (
  <Box
    component="nav"
    sx={{
      width: 1,
      height: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      zIndex: 2,
      boxShadow: "0px -4px 20px 6px rgba(0,0,0,0.63)",
    }}
  >
    {props.children}
  </Box>
);

const Inner = (props) => (
  <FlexRow
    component="nav"
    sx={{
      height: 1,
      width: 1,
      bgcolor: "background.default",
    }}
  >
    {props.children}
  </FlexRow>
);
