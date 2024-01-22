import { Box, Stack, Typography } from "@mui/material";

const SectionHeader = ({ title }) => (
  <Stack direction={"row"} alignItems={"center"}>
    <Box height={2} width={1} bgcolor={"secondary.main"} />
    <Typography
      variant="h3"
      sx={{
        my: 2,
        fontWeight: 300,
        mx: 2,
        textAlign: "center",
        textTransform: "capitalize",
      }}
    >
      {title}
    </Typography>
    <Box height={2} width={1} bgcolor={"secondary.main"} />
  </Stack>
);

export default SectionHeader;
