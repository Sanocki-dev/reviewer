import React, { useRef, useState } from "react";
import { Search as Icon } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  IconButton,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import { Form, useNavigate, createSearchParams } from "react-router-dom";

import SearchDropdown from "./SearchDropdown";
import { GetFetch } from "@/utils/getFetch";
import Action from "@/atoms/Button";

const Search = () => {
  const [focused, setFocused] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);
  const [isSearching, setIsSearching] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let value = inputRef.current.value;
    if (!value) return;

    const query = { query: value, page: 1 };
    onBlurHandler();

    navigate({
      pathname: "/search",
      search: `${createSearchParams(query)}`,
    });
  };

  const onChangeHandler = async () => {
    let value = inputRef.current?.value;

    document.body.style.overflow = "hidden";

    if (!value) return;

    try {
      const { data } = await GetFetch(`multi?query=${value}`);
      setSearchResults(data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const onFocusHandler = () => {
    setFocused(true);
    onChangeHandler();
  };

  const onBlurHandler = () => {
    setTimeout(() => {
      setIsSearching(false);
      setFocused(false);
      onCloseHandler();
    }, 400);
  };

  const onCloseHandler = async () => {
    setSearchResults(undefined);
    document.body.style.overflow = "unset";
  };

  const onSearchClick = () => {
    setIsSearching(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const id = open ? "simple-popover" : undefined;

  const IconSearch = () => (
    <Box display={"flex"} flexGrow={1} justifyContent={"flex-end"}>
      <Action
        startIcon={<Icon />}
        collapse={1}
        disabled={false}
        onClick={onSearchClick}
        disableRipple
        variant="text"
        tooltip="Search"
      />
    </Box>
  );

  return (
    <Form onSubmit={onSubmitHandler}>
      {isMobile && <IconSearch />}
      {(!isMobile || isSearching) && (
        <Container focused={focused} isMobile={isMobile}>
          <IconButton
            type="submit"
            onClick={onSubmitHandler}
            disableRipple
            sx={{ svg: { color: "neutral.medium" } }}
          >
            <Icon />
          </IconButton>
          <InputBase
            aria-describedby={id}
            sx={{ flex: 1, zIndex: 2 }}
            inputRef={inputRef}
            label="searchbar"
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            className="search_movies"
            placeholder={"Search Movies"}
          />
          <SearchDropdown
            open={searchResults !== undefined}
            close={onCloseHandler}
            searchResults={searchResults?.slice(0, 20)}
          />
          <Backdrop
            open={searchResults !== undefined || isSearching}
            sx={{ zIndex: -1 }}
            onClick={onCloseHandler}
          />
        </Container>
      )}
    </Form>
  );
};

export default Search;

const Container = (props) => (
  <Box
    sx={{
      display: "flex",
      position: props.isMobile ? "absolute" : "relative",
      flex: 1,
      zIndex: 2,
      bgcolor: "background.light",
      px: 2,
      pt: 0.5,
      borderRadius: props.isMobile ? undefined : "22px 3px 22px 6px",
      height: "40px",
      mx: 1,
      width: 1,
      maxWidth: props.isMobile ? undefined : 600,
      border: "1px solid",
      borderColor: props.focused ? "primary.main" : "background.light",
    }}
  >
    {props.children}
  </Box>
);
