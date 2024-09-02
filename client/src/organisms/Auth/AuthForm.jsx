import { useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Box, Link, Typography } from "@mui/material";
import { Transition } from "react-transition-group";

import { setLogin } from "@/context";
import { FormInput, Success } from "@/molecules/formUI";
import { LoginSchema, RegisterSchema } from "@/utils/formiks";
import { GetPost } from "@/utils/getFetch";
import Action from "@/atoms/Button";
import { Login } from "@mui/icons-material";

const AuthForm = ({ isLogin, handleClose }) => {
  const [forgot, setForgot] = useState(false);
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
      let url = isLogin ? "register" : "login"; // GET RID OF /
      const { data, status } = await GetPost(url, values);

      // Check if it was a success
      if (status !== 200) return;
      localStorage.setItem("token", data.token);
      setStatus(200);

      setTimeout(() => {
        handleClose();
      }, 1500);

      setTimeout(() => {
        dispatch(setLogin(data.user));
      }, 2200);
    } catch (error) {
      let errors = error.response?.data;
      console.log(errors);

      if (error.response.status !== 400) {
        setErrors({ server: "Unable to complete request. Please try again" });
        return;
      }

      if (errors?.message) {
        setFieldError("userName", errors.message);
      }

      Object.keys(errors).forEach((key) => {
        setFieldError(key, errors[key]);
      });
    }
  };

  return (
    <Formik enableReinitialize {...formik} onSubmit={onSubmitHandler}>
      {(form) => {
        return (
          <Form>
            <Success start={form.status === 200}>
              <Typography variant="h1">Success!</Typography>
              <Typography color={"primary.main"}>
                Welcome{!isLogin && " back"}
              </Typography>
            </Success>

            <Typography variant="subtitle2" color={"error"}>
              {form.errors.server}
            </Typography>

            <FormInput name="userName" label="Username" />
            <AnimatedInput
              animate={isLogin}
              type="email"
              name="email"
              label="Email"
            />
            <Box width={1}>
              <FormInput type="password" name="password" label="Password" />
              {!isLogin && (
                <Link
                  component={"button"}
                  underline="none"
                  sx={{ width: 1, textAlign: "right", fontSize: "10pt" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setForgot(true);
                    form.setErrors({
                      server: "Well remember it next time idiot",
                    });
                  }}
                >
                  Forgot password
                </Link>
              )}
            </Box>
            <AnimatedInput
              animate={isLogin}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />

            <Action
              type="submit"
              tooltip="Submit form"
              fullWidth
              startIcon={<Login />}
              disabled={form.isSubmitting}
              variant="contained"
              showText
              text={isLogin ? "Register" : "Login"}
            />
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
