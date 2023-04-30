import { Close } from "@mui/icons-material";
import { Button, Modal } from "@mui/material";

const VideoModal = ({ showTrailer, trailerURL, onClose }) => {
  return (
    <Modal
      open={showTrailer}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <>
        <iframe
          src={`${trailerURL}?autoplay=0`}
          title="Video"
          allowFullScreen
          className="video_player"
          frameBorder="0"
          width="100vw"
          height="480"
          sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        ></iframe>
        <Button
          endIcon={<Close />}
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          Close Video Player
        </Button>
      </>
    </Modal>
  );
};

export default VideoModal;
