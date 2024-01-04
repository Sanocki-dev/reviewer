import { useMemo } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import { Transition } from "react-transition-group";

import { setLogin } from "@/context";
import FormInput from "@/components/form/FormInput";
import { Login, Register } from "@/utils/formiks";
import { useNavigate } from "react-router-dom";

const AuthFormik = ({ isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let formik = useMemo(() => (isLogin ? Register : Login), [isLogin]);

  const onSuccessHandler = () => {
    dispatch(setLogin());
    navigate(0);
  };

  return (
    <Formik {...formik} enableReinitialize>
      {(form) => {
        if (form.status?.code === 200) {
          onSuccessHandler();
        }
        return (
          <Form>
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

export default AuthFormik;

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
