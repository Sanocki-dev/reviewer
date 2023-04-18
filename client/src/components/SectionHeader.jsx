import { Box, Typography, useMediaQuery } from "@mui/material";

const SectionHeader = ({ title, onClick }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box display="flex" alignItems={"flex-end"}>
      <Typography variant="h1" fontSize={isMobile ? 18 : 25} fontWeight="400">
        {title}
      </Typography>
      {/* <Typography
        component={"button"}
        sx={{ all: "unset", ml: 3, fontSize: 12, cursor: "pointer" }}
        variant="caption"
        onClick={onClick}
      >
        Show All
      </Typography> */}
    </Box>
  );
};

export default SectionHeader;
