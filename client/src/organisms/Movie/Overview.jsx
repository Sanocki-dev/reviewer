import { Box, Typography } from "@mui/material";
import GenreChips from "@/molecules/GenreChips";
import { baseImageURL } from "@/data/Images";

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
      <Box mt={1} gap={2} display={"flex"}>
        <div>
          <Typography variant="caption">Languages:</Typography>
          <Typography>
            {data.spoken_languages.map(
              ({ english_name }, index) =>
                english_name +
                (index !== data.spoken_languages.length - 1 ? ", " : "")
            )}
          </Typography>
        </div>
        <div>
          <Typography variant="caption">Release Date:</Typography>
          <Typography>{data.release_date}</Typography>
        </div>
      </Box>

      <Box display={"flex"} my={1} gap={2}>
        <div>
          <Typography variant="caption">Budget: </Typography>
          <Typography>${data.budget.toLocaleString()}</Typography>
        </div>
        <div>
          <Typography variant="caption">Revenue: </Typography>
          <Typography>${data.revenue.toLocaleString()}</Typography>
        </div>
      </Box>

      <Typography variant="caption">Production Companies</Typography>
      <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"}>
        <Typography>
          {data.production_companies?.map(
            ({ name }, i) =>
              name + (i !== data?.production_companies.length && ", ")
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default Overview;
