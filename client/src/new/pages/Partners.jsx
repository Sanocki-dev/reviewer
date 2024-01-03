import { Box } from "@mui/material";

const Partners = () => {

  const branding = [
    {
      alt: "TMDB",
      path: "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg",
    },
    {
      alt: "Just Watch",
      path: "https://www.justwatch.com/appassets/img/logo/JustWatch-logo-large.webp",
    },
  ];

  return branding.map(({ alt, path }) => (
    <Box
      component={"img"}
      src={path}
      alt={alt}
      sx={{ height: 20, cursor: "pointer" }}
    />
  ));
};

export default Partners;
