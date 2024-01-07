import { Box, Chip } from "@mui/material";
import { genres } from "@/data/Genres";

const GenreChips = ({ ids, sx, amount = 3 }) => {
  return (
    <Box sx={{ display: "flex", gap: 0.5, mt: 3, ...sx }}>
      {ids?.slice(0, amount)?.map((id) => (
        <Chip
          sx={{ color: "white", backgroundColor:'#454545' }}
          key={id}
          label={genres.find((genre) => genre.id == id).name}
          size="small"
        />
      ))}
    </Box>
  );
};

export default GenreChips;
