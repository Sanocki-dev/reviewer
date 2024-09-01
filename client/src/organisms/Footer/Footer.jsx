import { Box, Typography } from "@mui/material";
import Logo from "@/atoms/Logo";
import Partners from "@/atoms/Partners";
import FlexRow from "@/atoms/FlexRow";

const Footer = () => {
  return (
    <Box
      bgcolor="background.alt"
      sx={{
        py: 3,
        px: 3,
      }}
    >
      <FlexRow
        sx={{
          gap: 5,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box minHeight={35}>
          <Logo height={35} />
        </Box>
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
