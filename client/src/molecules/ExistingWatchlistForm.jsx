import { Typography } from "@mui/material";

import { WatchlistSelect } from "@/molecules/formUI";

const ExistingWatchlistForm = () => {
  return (
    <>
      <Typography variant="h6" mb={2} noWrap>
        Add or Remove this movie
      </Typography>
      <WatchlistSelect />
    </>
  );
};

export default ExistingWatchlistForm;
