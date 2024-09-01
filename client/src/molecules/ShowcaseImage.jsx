import { Box, useTheme } from "@mui/material";

const ShowcaseImage = ({ image, height, width }) => {
  const { palette } = useTheme();
  const imgURL = "https://image.tmdb.org/t/p/w1280/" + image;
  const fade = palette.background.main;
  if (!image) return;

  return (
    <Box
      sx={{
        position: "absolute",
        width: 1,
        height: 600,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        zIndex: 0,
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${imgURL})`,
          position: "absolute",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(.4) blur(4px)",
          width: width || "105%",
          height: height || 620,
        }}
      />
      <Box
        component={"img"}
        src={imgURL}
        sx={{
          position: "absolute",
          width: width || 1,
          maxWidth: 1280,
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          height: height || 600,
          filter: " brightness(.7)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          height: 80,
          width: 1,
          bottom: 0,
          background: fade,
          background: `linear-gradient(0deg, ${fade} 20%, rgba(0,0,0,0) 100%)`,
        }}
      />
    </Box>
  );
};

export default ShowcaseImage;
