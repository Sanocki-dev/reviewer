import { Backdrop, Box, Fade, Modal as MuiModal } from "@mui/material";

const Modal = ({ open, handleClose, children, sx }) => {
  if (!children) return;

  return (
    <MuiModal
      disableScrollLock
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      sx={{
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <Fade in={open}>
        <Box>{children}</Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
