import { useState } from "react";
import { Box, Stack, Typography, Link, Button } from "@mui/material";

import Logo from "./Logo";
import AuthFormik from "./AuthFormik";
import Modal from "./Modal";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const modeToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Button onClick={() => setOpenForm(true)}>Login</Button>
      <Modal open={openForm} handleClose={() => setOpenForm(false)}>
        <Container>
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

          <AuthFormik isLogin={isLogin} />

          <Stack direction={"row"} alignItems={"baseline"} gap={0.5}>
            <Typography variant="body2" color="grey.500">
              {isLogin
                ? "Already have an account?"
                : "Dont have an account yet?"}
            </Typography>
            <Link component={"button"} onClick={modeToggle} underline="none">
              {isLogin ? "Login" : "Register"}
            </Link>
          </Stack>
        </Container>
      </Modal>
    </>
  );
};

export default AuthForm;

const Container = (props) => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.alt",
      borderRadius: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      py: 5,
      px: 6,
      gap: 3,
      width: 500,
      boxShadow: 24,
    }}
  >
    {props.children}
  </Box>
);