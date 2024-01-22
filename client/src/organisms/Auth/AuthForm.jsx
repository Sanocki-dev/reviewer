import { useMemo } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import { Transition } from "react-transition-group";

import { setLogin } from "@/context";
import { FormInput, Success } from "@/molecules/formUI";
import { LoginSchema, RegisterSchema, getPost } from "@/utils/formiks";

const AuthForm = ({ isLogin, handleClose }) => {
  const dispatch = useDispatch();

  let formik = useMemo(
    () => (isLogin ? RegisterSchema : LoginSchema),
    [isLogin]
  );

  const onSubmitHandler = async (
    values,
    { setFieldError, setErrors, setStatus }
  ) => {
    try {
      const url = isLogin ? "/register" : "/login";

      const { success, data } = await getPost(
        url,
        values,
        setFieldError,
        setErrors
      );

      // Check if it was a success
      if (!success) return;
      localStorage.setItem("token", data.token);
      setStatus(200);

      setTimeout(() => {
        handleClose();
      }, 1500);

      setTimeout(() => {
        dispatch(setLogin(data.user));
      }, 2200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik {...formik} onSubmit={onSubmitHandler}>
      {(form) => {
        return (
          <Form>
            <Success start={form.status === 200}>
              <Typography variant="h1">Success!</Typography>
              <Typography color={"primary.main"}>Welcome back</Typography>
            </Success>

            <Typography variant="subtitle2" color={"error"}>
              {form.errors.server}
            </Typography>

            <FormInput type="text" name="email" label="Email" />
            <AnimatedInput animate={isLogin} name="userName" label="Username" />
            <FormInput type="password" name="password" label="Password" />
            <AnimatedInput
              animate={isLogin}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />

            <Button
              type="submit"
              fullWidth
              disabled={form.isSubmitting}
              sx={{ borderRadius: 3, textTransform: "none" }}
              variant="contained"
            >
              {isLogin ? "Register" : "Login"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AuthForm;

const AnimatedInput = ({ animate, name, label, type = "text" }) => (
  <Transition
    timeout={{ enter: 200, exit: 1000 }}
    in={animate}
    unmountOnExit
    mountOnEnter
  >
    {(mount) => (
      <FormInput
        type={type}
        name={name}
        label={label}
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
);
