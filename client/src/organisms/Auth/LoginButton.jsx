import { Button } from "@mui/material";
import { useState } from "react";
import LoginModal from "./LoginModal";

const LoginButton = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenForm(true)}>Login</Button>
      <LoginModal open={openForm} close={() => setOpenForm(false)} />
    </>
  );
};

export default LoginButton;
