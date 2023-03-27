import { Box, Grid, Skeleton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import ScrollBox from "@/components/ScrollBox";

const HomePage = () => {
  const movies = useSelector((state) => state.movies);
  const isLoading = !movies;
  const theme = useTheme();

  const neutralLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;

  const skeletons = [];

  for (let index = 0; index < 10; index++) {
    skeletons.push(
      <Skeleton
        variant="rectangular"
        height={450}
        width={300}
        display="inline-block"
      />
    );
  }

  const moviesArray = movies.slice(0, 30);

  return (
    <ScrollBox
      sx={{
        height: "100%",
        maxHeight: "calc(100% - 6rem)",
      }}
    >
      {isLoading && skeletons}
      <Grid container pb={15} position="relative">
        {moviesArray?.map(({ id, title, image }) => (
          <Grid
            item
            xs={6}
            md={4}
            lg={2}
            display="flex"
            justifyContent={"center"}
          >
            <Box
              key={id}
              sx={{
                height: "95%",
                width: "95%",
                objectFit: "cover",
                borderRadius: 4,
              }}
              component={"img"}
              src={
                image?.url ||
                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
              }
              alt={title + " image"}
            />
          </Grid>
        ))}
        <Box
          bottom={0}
          position={"sticky"}
          width="100%"
          height={150}
          sx={{
            background:
              "linear-gradient(0deg, " +
              alt +
              " 20%, " +
              neutralLight +
              "01 100%)",
          }}
        />
      </Grid>

      {!movies && (
        <Typography
          textAlign="center"
          mt={15}
          variant="h1"
          color="neutral.medium"
        >
          No movies found
        </Typography>
      )}
    </ScrollBox>
  );
};

export default HomePage;
