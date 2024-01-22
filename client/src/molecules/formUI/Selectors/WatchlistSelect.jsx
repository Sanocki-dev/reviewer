import { Check } from "@mui/icons-material";
import {
  FormControl,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

import { updateUser } from "@/context";

const WatchlistSelect = () => {
  const user = useSelector((state) => state.user);
  const { id: movie } = useLoaderData();
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const value = e.target.value;
    const watchlistId = user.watchlists.find(({ name }) => name === value)._id;

    //import.meta.env.VITE_SITE_URL
    //"http://localhost:8888/"

    try {
      let { data } = await axios.patch(
        `${import.meta.env.VITE_SITE_URL}/watchlist/${user.id}/${watchlistId}`,
        {
          movie: movie,
        }
      );

      dispatch(updateUser({ type: "watchlists", data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormControl fullWidth>
      <Select
        labelId="watchlist-select"
        id="watchlist-select"
        displayEmpty
        input={<OutlinedInput />}
        renderValue={() => "Select a watchlist"}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
        }}
      >
        <MenuItem disabled value="">
          <em>Watchlists</em>
        </MenuItem>
        {user?.watchlists?.map(({ _id, name, movies }) => {
          let inList = movies.includes(movie);
          return (
            <MenuItem sx={{ py: 1.5 }} value={name} key={_id}>
              <ListItemText primary={name} />
              {inList && (
                <ListItemAvatar sx={{ height: 20 }}>
                  <Check />
                </ListItemAvatar>
              )}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default WatchlistSelect;
