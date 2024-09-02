import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

import { GetPatch } from "@/utils/getFetch";
import { Button, Menu } from "@mui/material";
import { useState } from "react";

const ExistingWatchlistForm = () => {
  const user = useSelector((state) => state.user);
  const { id, title } = useLoaderData();

  const handleChange = async (e) => {

    const value = e.target.value;
    const watchlistId = user.watchlists.find(({ name }) => name === value)._id;

    //import.meta.env.VITE_SITE_URL
    //"http://localhost:8888/"

    try {
      let res = await GetPatch(`watchlist/${user.id}/${watchlistId}`, {
        movie: { id, title },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      id="demo-customized-button"
      aria-controls={open ? "demo-customized-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      variant="contained"
      disableElevation
      onClick={handleClick}
      endIcon={<KeyboardArrowDownIcon />}
    ></Button>
  );
};

export default ExistingWatchlistForm;
