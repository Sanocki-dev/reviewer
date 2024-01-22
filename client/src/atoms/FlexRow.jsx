import { Box } from "@mui/material";

const FlexRow = ({ children, sx }) => (
  <Box
    sx={{
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      flexDirection: "row",
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default FlexRow;
