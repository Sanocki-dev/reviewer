import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

import { GetPatch } from "@/utils/getFetch";

const WatchlistSelect = () => {
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
    <FormControl fullWidth>
      {user?.watchlists?.map(({ _id, name, movies }) => {
        let inList = movies.find((movie) => movie.id === id);
        return (
          <FormControlLabel
            key={_id}
            control={<Checkbox checked={inList?.id === id} />}
            label={name}
          />
        );
      })}
    </FormControl>
  );
};

export default WatchlistSelect;
