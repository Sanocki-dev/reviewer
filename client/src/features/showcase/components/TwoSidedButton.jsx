import { Box, Button } from "@mui/material";

const TwoSidedButton = ({ options, action }) => {
  return (
    <Box
      ml={3}
      sx={{
        overflow: "hidden",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "neutral.light",
        display: "flex",
      }}
    >
      <Button
        onClick={() => action(options[0].value.toLowerCase())}
        disabled={options[0].disabled}
        sx={{
          borderRight: "1px solid",
          borderRadius: "0",
          borderColor: "neutral.light",
        }}
      >
        {options[0].value}
      </Button>
      <Button
        disabled={options[1].disabled}
        sx={{ borderRadius: "0" }}
        onClick={() => action(options[1].value.toLowerCase())}
      >
        {options[1].value}
      </Button>
    </Box>
  );
};

export default TwoSidedButton;
