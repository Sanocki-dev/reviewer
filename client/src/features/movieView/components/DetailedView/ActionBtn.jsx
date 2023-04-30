import { IconButton, Tooltip } from "@mui/material";

const ActionBtn = ({ tooltip, icon, onClick }) => {
  return (
    <Tooltip placement="right" title={tooltip}>
      <IconButton sx={{ marginTop: 1 }}>{icon}</IconButton>
    </Tooltip>
  );
};

export default ActionBtn;
