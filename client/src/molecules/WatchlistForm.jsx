import { Button, Box } from "@mui/material";
import { useState } from "react";
import { Transition } from "react-transition-group";

import Modal from "@/templates/Modal";
import ExistingWatchlistForm from "./ExistingWatchlistForm";
import CreateWatchlistForm from "./CreateWatchlistForm";

const WatchlistForm = ({ open, close, user }) => {
  const [create, setCreate] = useState(false);

  return (
    <Modal open={open} handleClose={close} noCenter>
      <Transition in={create} unmountOnExit mountOnEnter timeout={0}>
        {(state) => (
          <Box
            sx={{
              width: state === "exited" ? "10%" : 1,
              opacity: state == "entered" ? 1 : 0,
              transition: "all .87s ease-in-out",
            }}
          >
            <CreateWatchlistForm user={user} handleClose={close} />
          </Box>
        )}
      </Transition>

      <Transition in={!create} unmountOnExit mountOnEnter timeout={0}>
        {(state) => (
          <Box
            sx={{
              width: state === "exited" ? 0 : 1,
              opacity: state == "entered" ? 1 : 0,
              transition: "all .87s ease-in-out",
            }}
          >
            <ExistingWatchlistForm user={user} />
          </Box>
        )}
      </Transition>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          onClick={() => setCreate(!create)}
        >
          {create ? "Existing list" : "New list"}
        </Button>
        <Button fullWidth variant="outlined" onClick={close}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default WatchlistForm;
