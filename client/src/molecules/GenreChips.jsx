import { Box, Chip, Typography } from "@mui/material";
import { genres } from "@/data/Genres";

const GenreChips = ({
  ids,
  names,
  sx,
  amount = 3,
  gap = 0.5,
  mt = 3,
  variant,
  size,
  color,
}) => {
  if (!ids) return;
  
  return (
    <Box mt={1}>
      <Typography variant="caption">Genre</Typography>
      <Typography>
        {ids?.map((id, i) => {
          return names
            ? id.name + (i !== ids.length - 1 ? ", " : "")
            : genres.find((genre) => genre.id == id)?.name +
                (i !== ids.length - 1 ? ", " : "");
        })}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", gap: gap, mt: mt, ...sx }}>
      {ids?.slice(0, amount)?.map((id, index) => (
        <Chip
          variant={variant || "outlined"}
          color={color || "secondary"}
          size={size || "medium"}
          key={index}
          label={names ? id.name : genres.find((genre) => genre.id == id)?.name}
        />
      ))}
    </Box>
  );
};

export default GenreChips;
