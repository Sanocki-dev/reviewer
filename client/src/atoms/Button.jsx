import { Button, Tooltip, useMediaQuery } from "@mui/material";

const Action = (props) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const margin = isMobile && { mx: 0 };

  return (
    <Tooltip title={props.tooltip}>
      <Button
        onClick={props.onClick}
        sx={{
          textTransform: "none",
          "> span": margin,
        }}
        variant="outlined"
        startIcon={props.children}
      >
        {!isMobile && props.text}
      </Button>
    </Tooltip>
  );
};

export default Action;
