import { Divider } from "@mui/material";

const SectionDivider = ({ state }) => (
  <Divider
    sx={{
      mt: 25,
      mb: 4,
      mx: 5,
      borderColor: "neutral.light",
      opacity: state ? 1 : 0,
      transition: "all .5s ease-in-out",
    }}
  />
);
export default SectionDivider;
