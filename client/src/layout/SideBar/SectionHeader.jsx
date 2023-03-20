import { Typography } from "@mui/material";

const SectionHeader = ({ isShowing, children }) => {
  return (
    <Typography
      sx={{
        color: "neutral.medium",
        fontWeight: "bold",
        fontSize: 12,
        pb: 1,
        ml: isShowing ? 4 : -20,
        opacity: isShowing ? 1 : 0,
        transition: "all .8s ease-in-out",
      }}
    >
      {children}
    </Typography>
  );
};

export default SectionHeader;
