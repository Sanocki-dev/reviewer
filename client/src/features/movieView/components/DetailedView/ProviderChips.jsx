import { Box, Chip, Typography } from "@mui/material";

const ProviderChips = ({ title, provider }) => {
  if (!provider) return;

  return (
    <>
      <Typography
        variant="caption"
        color="neutral.main"
        mr={1}
        my={1}
        width={50}
      >
        {title}
      </Typography>
      <Box display="flex" gap={1} flexWrap={"wrap"}>
        {provider.map(({ provider_id, provider_name }) => (
          <Chip key={provider_id} label={provider_name} size="small" />
        ))}
      </Box>
    </>
  );
};

export default ProviderChips;
