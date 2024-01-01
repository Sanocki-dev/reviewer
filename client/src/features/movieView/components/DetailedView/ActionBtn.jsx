import { IconButton, Tooltip } from "@mui/material";

const ActionBtn = ({ tooltip, icon, onClick }, props) => {
  return (
    <Tooltip placement="right" title={tooltip}>
      <IconButton sx={{ marginTop: 1, color:'white' }} onClick={onClick} {...props}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ActionBtn;
