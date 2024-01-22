import { useState } from "react";
import { Box, Stack, Typography, Link, Button } from "@mui/material";

import Logo from "../../atoms/Logo";
import Modal from "../../templates/Modal";
import AuthForm from "./AuthForm";

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const modeToggle = () => {
    setIsLogin(!isLogin);
  };
  return (
    <>
      <Button onClick={() => setOpenForm(true)}>Login</Button>
      <Modal open={openForm} handleClose={() => setOpenForm(false)}>
        <Logo />
        <Typography variant="h2">Welcome to R8Hub!</Typography>
        <Typography
          variant="body1"
          textAlign={"center"}
          color={"grey.400"}
          height={50}
          w={1}
        >
          {isLogin
            ? "Register to join the growing movie lover community and start exploring and rating thousands of movies!"
            : "Login and start creating and sharing your favorite movies and reviews!"}
        </Typography>

        <AuthForm isLogin={isLogin} handleClose={() => setOpenForm(false)} />

        <Stack direction={"row"} alignItems={"baseline"} gap={0.5}>
          <Typography variant="body2" color="grey.500">
            {isLogin ? "Already have an account?" : "Dont have an account yet?"}
          </Typography>
          <Link component={"button"} onClick={modeToggle} underline="none">
            {isLogin ? "Login" : "Register"}
          </Link>
        </Stack>
      </Modal>
    </>
  );
};

export default AuthModal;
