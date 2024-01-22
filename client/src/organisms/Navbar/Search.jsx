import { Search as Icon } from "@mui/icons-material";
import { Box, IconButton, InputBase } from "@mui/material";
import React, { useRef, useState } from "react";
import { Form, useNavigate, createSearchParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [focused, setFocused] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let value = inputRef.current.value;
    if (!value) return;

    const query = { query: value, page: 1 };
    navigate({
      pathname: "/search",
      search: `${createSearchParams(query)}`,
    });
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Container focused={focused}>
        <IconButton
          type="submit"
          onClick={onSubmitHandler}
          disableRipple
          sx={{ svg: { color: "neutral.medium" } }}
        >
          <Icon />
        </IconButton>
        <InputBase
          sx={{ flex: 1 }}
          inputRef={inputRef}
          label="searchbar"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="search_movies"
          placeholder={"Search Movies"}
        />
      </Container>
    </Form>
  );
};

export default Search;

const Container = (props) => (
  <Box
    sx={{
      display: "flex",
      flex: 1,
      bgcolor: "background.light",
      px: 2,
      pt: 0.5,
      borderRadius: "22px 3px 22px 6px",
      height: "40px",
      mt: "5px",
      mx: 1,
      maxWidth: 400,
      border: "1px solid",
      borderColor: props.focused ? "primary.main" : "background.light",
    }}
  >
    {props.children}
  </Box>
);
