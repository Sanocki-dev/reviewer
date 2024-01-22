import { Box, Chip, Typography } from "@mui/material";

const ProviderChips = ({ title, provider }) => {
  if (!provider) return;

  return (
    <>
      <Typography variant="caption" color="neutral.main" width={50}>
        {title}
      </Typography>
      <Box display="flex" my={1} gap={1} flexWrap={"wrap"}>
        {provider.map(({ provider_id, provider_name }) => (
          <Chip
            color="primary"
            variant="outlined"
            key={provider_id}
            label={provider_name}
          />
        ))}
      </Box>
    </>
  );
};

export default ProviderChips;
