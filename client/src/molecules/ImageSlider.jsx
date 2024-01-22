import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import ImageSliderButton from "./ImageSliderButton";

function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  const formattedImages = useMemo(() => {
    let image = [];

    images?.forEach(({ file_path, iso_639_1 }) => {
      if (iso_639_1 === "en" || iso_639_1 === null) {
        image.push(file_path);
      }
    });

    return image;
  }, [images]);

  const changeImage = (direction) => {
    let length = formattedImages.length - 1;

    // Going forwards
    if (index == length && direction) return setIndex(0);
    if (direction) return setIndex((state) => ++state);

    // Going backwards
    if (!direction && index == 0) return setIndex(length);
    setIndex((state) => --state);
  };

  return (
    <Container>
      <ImageSliderButton left onClick={() => changeImage(false)} />
      <Image image={formattedImages[index]} />
      <ImageSliderButton right onClick={() => changeImage(true)} />
    </Container>
  );
}

export default ImageSlider;

const Container = (props) => (
  <Box
    sx={{
      width: "100%",
      mx: "auto",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      minWidth: 270,
      position: "relative",
      borderRadius: 2,
      overflow:'hidden',
      bgcolor: "background.alt",
    }}
  >
    {props.children}
  </Box>
);

const Image = (props) => (
  <Box
    component={"img"}
    src={"https://image.tmdb.org/t/p/w1280" + props.image}
    sx={{
      flex: 1,
      objectFit: "contain",
      height: 1,
      minWidth: 100,
      width: 1,
      maxHeight: 300,
      bgcolor: "background.alt",
    }}
  />
);
