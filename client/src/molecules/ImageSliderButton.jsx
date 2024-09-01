import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const ImageSliderButton = ({ onClick, left, right }) => {
  return (
    <Box
      sx={{
        right: right ? 0 : null,
        left: left ? 0 : null,
        position: "absolute",
        height: 1,
        width: "15%",
        display: "flex",
        justifyContent: "flex-end",
        "&:hover": {
          bgcolor: "#35353533",
        },
        transition: "all .4s ease-in-out",
      }}
    >
      <IconButton
        sx={{ width: 1 }}
        disableFocusRipple
        disableRipple
        onClick={onClick}
      >
        {left && <ArrowBackIosNew />}
        {right && <ArrowForwardIos />}
      </IconButton>
    </Box>
  );
};

export default ImageSliderButton;
