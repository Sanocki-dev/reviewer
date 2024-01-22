import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const PartnerSelect = ({ friends, form }) => {
  return (
    <FormControl fullWidth sx={{ my: 2 }}>
      <InputLabel id="Genre-select-label">Collaborators</InputLabel>
      <Select
        labelId="collab-select"
        id="partners"
        displayEmpty
        multiple
        input={<OutlinedInput label="Collaborators" />}
        renderValue={(select) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {select?.map((value, index) => {
              return (
                <Chip
                  key={index}
                  variant="outlined"
                  label={friends.find(({ _id }) => value === _id).userName}
                />
              );
            })}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
        }}
        {...form.getFieldProps("partners")}
      >
        <MenuItem disabled value="">
          <em>Collaborators</em>
        </MenuItem>
        {friends?.map(({ _id, userName }, index) => (
          <MenuItem sx={{ py: 1.5 }} value={_id} key={index}>
            {userName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PartnerSelect;
