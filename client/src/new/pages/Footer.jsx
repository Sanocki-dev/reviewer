import { Box, Typography } from "@mui/material";
import Logo from "./Logo";
import Partners from "./Partners";
import FlexRow from "./FlexRow";

const Footer = () => {
  return (
    <Box bgcolor="background.alt">
      <FlexRow
        sx={{
          height: 80,
          gap: 5,
          alignItems: "center",
        }}
      >
        <Logo height={35} />
        <Partners />
      </FlexRow>
      <Typography textAlign={"center"} color="neutral.main" py={3}>
        2023 R8Hub is a personal project. All movie data comes from TMDB and
        JustWatch
      </Typography>
    </Box>
  );
};

export default Footer;
