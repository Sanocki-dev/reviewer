import { Box, Stack, Typography } from "@mui/material";

const SectionHeader = ({ title }) => (
  <Stack direction={"row"} alignItems={"center"}>
    <Box height={2} width={1} bgcolor={"background.default"} />
    <Typography
      variant="h3"
      sx={{
        my: 2,
        fontWeight: 300,
        mx: 2,
        textAlign: "center",
        textTransform: "capitalize",
        whiteSpace: "nowrap",
      }}
    >
      {title}
    </Typography>
    <Box height={2} width={1} bgcolor={"background.default"} />
  </Stack>
);

export default SectionHeader;
