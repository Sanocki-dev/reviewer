import { Box, Chip } from "@mui/material";
import { genres } from "@/data/Genres";

const GenreChips = ({ ids, names, sx, amount = 3, gap = 0.5, mt = 3 }) => {
  return (
    <Box sx={{ display: "flex", gap: gap, mt: mt, ...sx }}>
      {ids?.slice(0, amount)?.map((id, index) => (
        <Chip
          variant="outlined"
          color="secondary"
          key={index}
          label={names ? id.name : genres.find((genre) => genre.id == id)?.name}
        />
      ))}
    </Box>
  );
};

export default GenreChips;
