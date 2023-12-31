import React from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";

import { DetailedView } from "@/features/movieView";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.user.favorites);

  console.log(favorites)
  return (
    <Stack gap={2} minHeight={700}>
      {favorites?.map((movie) => (
        <DetailedView key={movie.id} id={movie.id} />
      ))}
    </Stack>
  );
};

export default FavoritesPage;
