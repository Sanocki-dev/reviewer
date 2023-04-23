import { Typography, useMediaQuery } from "@mui/material";

const SectionHeader = ({ title }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Typography
      mt={2}
      variant="h1"
      fontSize={isMobile ? 18 : 25}
      fontWeight="400"
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;
