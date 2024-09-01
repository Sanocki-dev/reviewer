import {
  Backdrop,
  Box,
  Modal as MuiModal,
  styled,
  useMediaQuery,
} from "@mui/material";

const Modal = ({ open, handleClose, children, noCenter = false, width }) => {
  if (!children) return;
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
      <Container
        width={width}
        mobile={isMobile ? 1 : 0}
        alignItems={!noCenter ? "center" : undefined}
      >
        {children}
      </Container>
    </MuiModal>
  );
};

export default Modal;

const Container = styled(Box)(({ theme, width, ...props }) =>
  theme.unstable_sx({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: theme.palette.background.default,
    borderRadius: props.mobile ? 0 : 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    py: 5,
    px: props.mobile ? 2 : 6,
    gap: 3,
    width: props.mobile ? "100%" : width || 500,
    boxShadow: 24,
    opacity: 1,
    transition: "opacity 1s easy-out",
  })
);
