import { Box, Button, Tooltip, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const Action = (props) => {
  const user = useSelector((state) => state.user);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const margin = (isMobile || !props.text) && !props.showText && { mx: 0 };

  return (
    <Tooltip title={props.tooltip}>
      <Box component="span" width={props.fullWidth ? 1 : undefined}>
        <Button
          onClick={props.onClick}
          sx={{
            minWidth: isMobile && props.collapse ? 40 : undefined,
            textTransform: "none",
            "> span": margin,
          }}
          variant={props.variant || "outlined"}
          startIcon={props.children}
          disabled={props.disabled || !user}
          {...props}
        >
          {(!isMobile || props.showText) && props.text}
        </Button>
      </Box>
    </Tooltip>
  );
};

export default Action;
