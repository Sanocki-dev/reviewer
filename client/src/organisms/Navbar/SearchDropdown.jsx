import { List, useMediaQuery } from "@mui/material";

import SearchDropdownItem from "./SearchDropdownItem";

const SearchDropdown = ({ open, close, searchResults }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  if (!open) return;

  return (
    <>
      <List
        sx={{
          top: isMobile ? 50 : 40,
          position: isMobile ? "fixed" : "absolute",
          maxHeight: 600,
          bgcolor: "background.default",
          overflowY: "scroll",
          overflowX: "hidden",
          width: 1,
          left: 0,
          zIndex: 2,
          p:0
        }}
      >
        {searchResults.map((result) => (
          <SearchDropdownItem key={result.id} data={result} close={close} />
        ))}
      </List>
    </>
  );
};

export default SearchDropdown;
