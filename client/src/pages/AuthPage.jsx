import {
  Box,
  Button,
  Link,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Google } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { useGoogleLogin } from "@react-oauth/google";
import { Transition } from "react-transition-group";

import logo from "@/assets/brand/R8BrandLight.svg";
import { LoginForm, RegisterForm } from "./AuthForms";
import { setLogin, toggleIsAuthenticating } from "@/context";
import FormInput from "@/components/form/FormInput";

const AuthPage = () => {
  const isAuthenticating = useSelector((state) => state.isAuthenticating);
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();

  let formik = useMemo(
    () => (isRegistering ? RegisterForm : LoginForm),
    [isRegistering]
  );

  const onSubmitHandler = (values) => {
    dispatch(setLogin(values));
  };

  const onCloseHandler = () => {
    dispatch(toggleIsAuthenticating());
  };

  const authTypeSwitcher = () => {
    setIsRegistering(!isRegistering);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <Modal
      open={isAuthenticating}
      onClose={onCloseHandler}
      aria-labelledby="authenticaion-modal"
      aria-describedby="Login and registration modal"
    >
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
        }}
      >
        <Box component={"img"} height={50} alt="R8 Logo" src={logo} />
        <Typography variant="h2">Welcome to R8Hub!</Typography>
        <Typography
          variant="body1"
          textAlign={"center"}
          color={"grey.400"}
          height={50}
          w={1}
        >
          {isRegistering
            ? "Register to create your first account and start exploring and rating thousands of movies!"
            : "Login and start creating and sharing your favorite movies and reviews!"}
        </Typography>

        <Formik {...formik}>
          {(form) => {
            if (!form.isSubmitting && form.status?.code === 201)
              onSubmitHandler(form.status.data);
            return (
              <Form>
                <Typography variant="subtitle2" color={"error"}>
                  {form.errors.server}
                </Typography>
                <FormInput type="text" name="email" label="Email" />
                <Transition
                  timeout={{ enter: 200, exit: 1000 }}
                  in={isRegistering}
                  unmountOnExit
                  mountOnEnter
                >
                  {(mount) => (
                    <FormInput
                      type="text"
                      name="userName"
                      label="Username"
                      sx={{
                        height: 62.7,
                        ml: mount === "entered" ? 0 : -20,
                        mt: mount === "entered" ? 0 : -10.75,
                        opacity: mount === "entered" ? 1 : 0,
                        transition: "all 0.6s ease-in-out",
                      }}
                    />
                  )}
                </Transition>

                <FormInput type="password" name="password" label="Password" />
                <Transition
                  timeout={{ enter: 200, exit: 1000 }}
                  in={isRegistering}
                  unmountOnExit
                  mountOnEnter
                >
                  {(mount) => (
                    <FormInput
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                      sx={{
                        height: 62.7,
                        ml: mount === "entered" ? 0 : -20,
                        mt: mount === "entered" ? 0 : -10.75,
                        opacity: mount === "entered" ? 1 : 0,
                        transition: "all 0.6s ease-in-out",
                      }}
                    />
                  )}
                </Transition>

                <Button
                  type="submit"
                  fullWidth
                  disabled={form.isSubmitting}
                  sx={{ borderRadius: 3, textTransform: "none" }}
                  variant="contained"
                >
                  {isRegistering ? "Register" : "Login"}
                </Button>
              </Form>
            );
          }}
        </Formik>

        <Stack direction={"row"} alignItems={"center"} width={0.75}>
          <Box flex={1} sx={{ height: "1px", bgcolor: "grey.500" }} />
          <Typography flexShrink={1} px={1} variant="caption">
            Or Register with
          </Typography>
          <Box flex={1} sx={{ height: "1px", bgcolor: "grey.500" }} />
        </Stack>

        <Button
          startIcon={<Google />}
          onClick={handleGoogleLogin}
          sx={{
            bgcolor: "white.400",
            textTransform: "none",
            borderRadius: 3,
            flex: 1,
            "&:hover": { bgcolor: "grey.100", color: "black" },
            transition: "all .5s ease-in-out",
          }}
        >
          Sign in with Google
        </Button>

        <Stack direction={"row"} alignItems={"baseline"} gap={0.5}>
          <Typography variant="body2" color="grey.500">
            {isRegistering
              ? "Already have an account?"
              : "Dont have an account yet?"}
          </Typography>
          <Link
            component={"button"}
            onClick={authTypeSwitcher}
            underline="none"
          >
            {isRegistering ? "Login" : "Register"}
          </Link>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AuthPage;

