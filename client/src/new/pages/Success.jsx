import { Box } from "@mui/material";
import { Transition } from "react-transition-group";

const Success = ({ start, timeout = 0, children }) => {
  return (
    <Transition in={start} unmountOnExit timeout={timeout}>
      {(state) => (
        <Box
          sx={{
            width: 1,
            height: 1,
            bgcolor: "background.default",
            opacity: state === "entered" ? 0.9 : 0,
            borderRadius: 1,
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            flexDirection: "column",
            transition: "opacity 1s ease-in-out",
          }}
        >
          {children}
        </Box>
      )}
    </Transition>
  );
};

export default Success;
