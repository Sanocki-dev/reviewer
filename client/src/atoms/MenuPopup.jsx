import { Menu } from "@mui/material";

const MenuPopup = ({ id, anchor, open, toggle, children }) => {
  return (
    <Menu
      disableScrollLock={true}
      anchorEl={anchor}
      id={id}
      open={open}
      onClose={toggle}
      onClick={toggle}
    >
      {children}
    </Menu>
  );
};

export default MenuPopup;
