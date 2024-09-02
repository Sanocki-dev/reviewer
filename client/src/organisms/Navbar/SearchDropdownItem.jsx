import { Box, ListItem, Typography } from "@mui/material";

import GenreChips from "@/molecules/GenreChips";
import { baseImageURL, noImageURL, gender } from "@/data/Images";
import { useNavigate } from "react-router-dom";

const SearchDropdownItem = ({ data, close }) => {
  const navigate = useNavigate();
  const image = data.poster_path || data.profile_path;
  const imageURL = image ? baseImageURL + image : noImageURL;
  const name = data.name || data.title;

  if (data.media_type === "person" && data.gender === 0) return;

  const onClickHandler = () => {
    navigate(`${data.media_type}?id=${data.id}`);
    close()
  };

  return (
    <ListItem
      sx={{
        height: 110,
        borderBottom: "2px solid",
        borderColor: "background.alt",
        "&:hover": {
          bgcolor: "background.light",
          cursor: "pointer",
        },
      }}
      onClick={onClickHandler}
    >
      <Box
        component={"img"}
        src={imageURL || noImageURL}
        width={60}
        height={90}
        alt={name + "-image"}
        sx={{ objectFit: "cover", mr: 2 }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1">
          {name.slice(0, 40)}
          {name.length > 40 && "..."}
        </Typography>

        {data.media_type === "person" ? (
          <PersonItem data={data} />
        ) : (
          <MovieItem data={data} />
        )}
      </Box>
    </ListItem>
  );
};

export default SearchDropdownItem;

const MovieItem = ({ data }) => {
  const date =
    data.release_date?.slice(0, 4) || data.first_air_date?.slice(0, 4);

  return (
    <>
      <Typography variant="subtitle2">{date}</Typography>
      <GenreChips size="small" ids={data.genre_ids} mt={1} />
    </>
  );
};

const PersonItem = ({ data }) => {
  const title = gender[data?.gender - 1];
  const known_for = data?.known_for[0]?.name || data?.known_for[0]?.title;

  return (
    <Typography variant="subtitle2">
      {`${title}, ${known_for || "Unknown"}`}
    </Typography>
  );
};
