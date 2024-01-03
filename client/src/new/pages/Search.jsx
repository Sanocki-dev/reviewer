import { Search as Icon } from "@mui/icons-material";
import { Box, IconButton, InputBase } from "@mui/material";
import React, { useRef } from "react";
import { Form, useNavigate, createSearchParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
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
      <Box
        sx={{
          display: "flex",
          flex: 1,
          bgcolor: "background.alt",
          px: 2,
          pt: 0.5,
          borderRadius: "22px 3px 22px 6px",
          height: "40px",
          mt: "5px",
          mx: 1,
        }}
      >
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
          className="search_movies"
          placeholder={"Search Movies"}
        />
      </Box>
    </Form>
  );
};

export default Search;
