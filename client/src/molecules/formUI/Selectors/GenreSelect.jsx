import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

import { genres } from "@/data/Genres";

const GenreSelect = ({ form }) => {
  return (
    <FormControl name="genre" fullWidth>
      <InputLabel id="Genre-select-label">Genres</InputLabel>
      <Select
        labelId="Genre-select"
        id="genre"
        displayEmpty
        multiple
        input={<OutlinedInput label="Genres" />}
        renderValue={(select) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {select?.map((value, index) => (
              <Chip variant="outlined" key={index} label={value} />
            ))}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
        }}
        {...form.getFieldProps("genre")}
      >
        <MenuItem disabled value="">
          <em>Genres</em>
        </MenuItem>
        {genres?.map(({ name }, index) => (
          <MenuItem sx={{ py: 1.5 }} value={name} key={index}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenreSelect;
