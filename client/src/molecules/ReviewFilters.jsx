import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import FlexRow from "@/atoms/FlexRow";
import { SwapVert } from "@mui/icons-material";
import moment from "moment";

const ReviewFilters = ({ reviews, onSort }) => {
  const [sortedReviews, setSortedReviews] = useState(reviews);
  const [value, setValue] = useState("medals");

  const handleChange = async (event) => {
    let sortingBy = event.target.value;
    setValue(sortingBy);

    let sorted = null;
    switch (sortingBy) {
      case "rating":
        sorted = await reviews.sort((a, b) => b[sortingBy] - a[sortingBy]);
        break;
      case "createdAt":
        sorted = await reviews.sort((a, b) =>
          moment(a.createdAt).diff(moment(b.createdAt))
        );
        sorted = sorted.reverse();
      default:
        sorted = await reviews.sort(
          (a, b) => b[sortingBy].length - a[sortingBy].length
        );
        break;
    }
    onSort(sorted);
    setSortedReviews(sorted);
  };

  const swapOrder = () => {
    const reversedSort = sortedReviews.reverse();
    onSort(reversedSort);
    setSortedReviews(reversedSort);
  };

  return (
    <FlexRow sx={{ justifyContent: "flex-end" }}>
      <FormControl fullWidth sx={{ mb: 1 }}>
        <InputLabel id="select-sort-by">Sort by</InputLabel>
        <Select
          labelId="select-sort-by-label"
          id="sort-by"
          value={value}
          label="Sort-by"
          onChange={handleChange}
        >
          <MenuItem value={"medals"}>Votes</MenuItem>
          <MenuItem value={"createdAt"}>Date</MenuItem>
          <MenuItem value={"rating"}>Rating</MenuItem>
        </Select>
      </FormControl>
      <Tooltip title="Reverse order">
        <IconButton
          aria-label="reverse"
          color="secondary"
          disableRipple
          sx={{ width: 50 }}
          onClick={swapOrder}
        >
          <SwapVert />
        </IconButton>
      </Tooltip>
    </FlexRow>
  );
};

export default ReviewFilters;
