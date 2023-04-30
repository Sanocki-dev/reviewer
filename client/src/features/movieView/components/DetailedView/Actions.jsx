import { Box } from "@mui/material";
import { FavoriteBorder, Visibility, WatchLater } from "@mui/icons-material";

import ScoreCircle from "../ScoreCircle";
import ActionBtn from "./ActionBtn";

const Actions = ({ data }) => {
  return (
    <Box display="flex" flexDirection={"column"} alignItems="center">
      <ScoreCircle score={data.vote_average} total={data.vote_count} isPlaced />
      <ActionBtn
        tooltip="Add to watch list"
        icon={<WatchLater />}
        onClick={() => console.log("Add to favorites")}
      />
      <ActionBtn
        tooltip="Add to favorites"
        icon={<FavoriteBorder />}
        onClick={() => console.log("Add to favorites")}
      />
      <ActionBtn
        tooltip="Add to seen list"
        icon={<Visibility />}
        onClick={() => console.log("Add to seen list")}
      />
    </Box>
  );
};

export default Actions;
