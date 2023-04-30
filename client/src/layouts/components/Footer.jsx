import { Box, Typography } from "@mui/material";
import r8logo from "@/assets/brand/r8hub_logo_light.svg";
import Brand from "./Brand";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "neutral.light",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 80,
          width: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Brand src={r8logo} alt="r8Hub" sx={{ height: 35 }} />
        <Box>
          <Typography variant="h6">Powered By</Typography>
          <Brand
            src={
              "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            }
            alt={"The Movie DB"}
            sx={{ mr: 5 }}
          />
          <Brand
            src={
              "https://www.justwatch.com/appassets/img/logo/JustWatch-logo-large.webp"
            }
            alt={"Just Watch"}
          />
        </Box>
      </Box>
      <Typography textAlign={'center'} color="neutral.main" py={3}>2023 R8Hub is a personal project. All movie data comes from TMDB and JustWatch</Typography>
    </Box>
  );
};

export default Footer;
