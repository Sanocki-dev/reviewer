import { CheckBox, Search, Tune } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  MenuItem,
  Popover,
  Rating,
  Select,
  Slider,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "@/store";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [params, setParams] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterAnchor, setFilterAnchor] = useState(null);

  // THEME
  const theme = useTheme();

  const neutralMedium = theme.palette.neutral.medium;

  const fetchData = async (e) => {
    e.preventDefault();

    const BASE_URL =
      import.meta.env.VITE_BASE_SEARCH_URL +
      "&query=" +
      params +
      "&page=1&sort_by=primary_release_date.desc&append_to_response=reviews";

    const response = await fetch(
      BASE_URL,
      {
        method: "GET",
      }
    );

    const searchResults = await response.json();
    dispatch(setMovies(searchResults.results));
    navigate("/search?" + params);
  };

  const open = Boolean(filterAnchor);
  const id = open ? "filter-popover" : undefined;

  return (
    <Box
      border="1px solid"
      borderColor="neutral.light"
      borderRadius={4}
      width="100%"
      maxWidth={700}
      display="flex"
      transition="width .3s ease-in-out"
    >
      <form action="post" onSubmit={fetchData}>
        <IconButton
          disabled
          disableRipple
          sx={{ px: 2, svg: { color: neutralMedium } }}
        >
          <Search />
        </IconButton>
        <InputBase
          sx={{ width: "90%" }}
          label="search"
          value={params}
          id="search_movies"
          placeholder="Search Movies"
          onChange={(e) => setParams(e.target.value)}
        />
        <div>
          <IconButton
            aria-describedby={id}
            disableRipple
            sx={{ px: 2, svg: { color: neutralMedium } }}
            onClick={(e) => setFilterAnchor(e.currentTarget)}
          >
            <Tune />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={filterAnchor}
            onClose={() => setFilterAnchor(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box p={3} width="100%" maxWidth="800px">
              <Typography>Genre</Typography>
              <FormGroup sx={{ flexDirection: "row" }}>
                <FormControlLabel control={<Checkbox />} label="Comedy" />
                <FormControlLabel control={<Checkbox />} label="Horror" />
                <FormControlLabel control={<Checkbox />} label="Romance" />
                <FormControlLabel control={<Checkbox />} label="thriller" />
                <FormControlLabel control={<Checkbox />} label="sci-fi" />
                <FormControlLabel control={<Checkbox />} label="drama" />
                <FormControlLabel control={<Checkbox />} label="action" />
                <FormControlLabel control={<Checkbox />} label="adventure" />
                <FormControlLabel control={<Checkbox />} label="animation" />
                <FormControlLabel control={<Checkbox />} label="biography" />
                <FormControlLabel control={<Checkbox />} label="crime" />
                <FormControlLabel control={<Checkbox />} label="documentary" />
                <FormControlLabel control={<Checkbox />} label="family" />
                <FormControlLabel control={<Checkbox />} label="fantasy" />
                <FormControlLabel control={<Checkbox />} label="film-noir" />
                <FormControlLabel control={<Checkbox />} label="game-show" />
                <FormControlLabel control={<Checkbox />} label="history" />
                <FormControlLabel control={<Checkbox />} label="music" />
                <FormControlLabel control={<Checkbox />} label="musical" />
                <FormControlLabel control={<Checkbox />} label="mystery" />
                <FormControlLabel control={<Checkbox />} label="news" />
                <FormControlLabel control={<Checkbox />} label="reality-tv" />
                <FormControlLabel control={<Checkbox />} label="sport" />
                <FormControlLabel control={<Checkbox />} label="talk-show" />
                <FormControlLabel control={<Checkbox />} label="war" />
                <FormControlLabel control={<Checkbox />} label="western" />
              </FormGroup>
              <Typography>Year</Typography>
              {/* <Slider
                valueLabelDisplay="on"
                sx={{ width: "300px" }}
                min={1950}
                max={2022}
                value={[1950, 2022]}
              /> */}
              <Typography>Rating</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Rating value={2} />
                <Button ml="auto" variant="contained">
                  Search
                </Button>
              </Box>
            </Box>
          </Popover>
        </div>
      </form>
    </Box>
  );
};

export default SearchBar;
