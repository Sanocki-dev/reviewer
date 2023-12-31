import React from "react";
import { useSelector } from "react-redux";
import { DetailedView } from "@/features/movieView";
import { Stack } from "@mui/material";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.user.favorites);

  return (
    <Stack gap={2} minHeight={700}>
      {favorites.map((movie) => (
        <DetailedView key={movie.id} movie={movie} />
      ))}
    </Stack>
  );
};

export default FavoritesPage;
