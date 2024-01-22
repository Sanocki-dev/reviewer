import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import Logo from "../atoms/Logo";

const ClickableLogo = ({ height = 30, sx }) => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        mx: 2,
        cursor: "pointer",
        my: "10px",
        ...sx,
      }}
    >
      <Logo height={height} />
    </Box>
  );
};

export default ClickableLogo;
