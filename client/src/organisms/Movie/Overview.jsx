import { Box, Typography } from "@mui/material";
import GenreChips from "@/molecules/GenreChips";

const Overview = ({ data }) => {
  return (
    <Box
      minWidth={270}
      flex={1}
      p={3}
      borderRadius={2}
      bgcolor={"background.alt"}
    >
      <Typography variant="h5" mb={2}>
        Movie Overview
      </Typography>
      <Typography flex={1}>{data.overview}</Typography>
      <GenreChips size={"large"} gap={2} names ids={data.genres} />
      <Box mt={2}>
        <div>
          <Typography variant="subtitle2">Languages:</Typography>
          <Typography>
            {data.spoken_languages.map(
              ({ english_name }, index) =>
                english_name +
                (index !== data.spoken_languages.length - 1 ? ", " : "")
            )}
          </Typography>
        </div>
      </Box>
      <Box display={"flex"} mt={1} gap={2}>
        <div>
          <Typography variant="subtitle2">Budget: </Typography>
          <Typography>${data.budget.toLocaleString()}</Typography>
        </div>
        <div>
          <Typography variant="subtitle2">Revenue: </Typography>
          <Typography>${data.revenue.toLocaleString()}</Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Overview;
