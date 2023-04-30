import { Box } from "@mui/material";

const Brand = ({ src, alt, sx }) => {
  return (
    <Box
      component={"img"}
      src={src}
      alt={alt}
      sx={{ height: 20, cursor: "pointer", ...sx }}
    />
  );
};

export default Brand;
