import { Box } from "@mui/material";

const MovieImage = ({ title, image, sx }) => {
  const baseImageURL = "https://image.tmdb.org/t/p/w500/";
  const noImageURL =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

  const imageURL = image ? baseImageURL + image : noImageURL;
  
  return (
    <Box
      sx={{
        height: 200,
        width: 150,
        objectFit: "fit",
        ...sx,
      }}
      component={"img"}
      src={imageURL}
      alt={title + " image"}
    />
  );
};

export default MovieImage;
