import { Box, Typography } from "@mui/material";
import ProviderChips from "@/molecules/ProviderChips";

const Providers = ({ data }) => {
  const providers = data["watch/providers"]?.results["CA"];

  return (
    <Box
      width={"100%"}
      p={3}
      mt={2}
      borderRadius={2}
      bgcolor={"background.alt"}
    >
      <Typography variant="h5">Where to watch</Typography>
      <ProviderChips provider={providers?.buy} title={"Rent / Buy"} />
      <ProviderChips provider={providers?.flatrate} title={"Stream"} />
    </Box>
  );
};

export default Providers;
