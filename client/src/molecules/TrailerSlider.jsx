import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";

function TrailerSlider({ videos, isMobile }) {
  const [index, setIndex] = useState(0);

  const formattedVideos = useMemo(() => {
    let video = [];

    videos?.forEach(({ site, key, type, iso_639_1, name }) => {
      if (
        site === "YouTube" &&
        iso_639_1 === "en" &&
        (type === "Teaser" || type === "Trailer" || type === "Clip")
      ) {
        video.push({
          uri: "https://www.youtube.com/embed/" + key,
          name,
        });
      }
    });

    return video;
  }, [videos]);

  const changeVideo = (direction) => {
    let length = formattedVideos.length - 1;

    // Going forwards
    if (index == length && direction) return setIndex(0);
    if (direction) return setIndex((state) => ++state);

    // Going backwards
    if (!direction && index == 0) return setIndex(length);
    setIndex((state) => --state);
  };

  return (
    <Container isMobile={isMobile}>
      <VideoPlayer video={formattedVideos[index].uri} />
      <Box
        width={1}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <IconButton onClick={() => changeVideo(false)}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography noWrap>{formattedVideos[index].name}</Typography>
        <IconButton onClick={() => changeVideo(true)}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Container>
  );
}

export default TrailerSlider;

const VideoPlayer = (props) => (
  <Box
    component={"iframe"}
    src={`${props.video}?autoplay=0`}
    title="Video"
    allowFullScreen
    className="video_player"
    width="100%"
    height="100%"
    minWidth={270}
    minHeight={300}
    sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
  />
);

const Container = (props) => (
  <Box
    sx={{
      width: 1,
      display: "flex",
      flexDirection: "column",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {props.children}
  </Box>
);
