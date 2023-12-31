import axios from "axios";
import * as Yup from "yup";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

export const RegisterForm = {
  initialValues: {
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  },
  validationSchema: Yup.object({
    userName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .min(2, "Must be 2 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(2, "Must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  }),
  onSubmit: async (values, { setFieldError, setStatus }) => {
    const { email, userName, password } = values;
    try {
      const res = await axios.post(
        import.meta.env.VITE_SITE_URL + "/register",
        { email, userName, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      cookies.set("token", `Bearer ${res.data.token}`);
      cookies.set("user", res.data.user);

      setStatus({ code: 201, data: res.data.user });
    } catch (error) {
      // Set all errors from the server
      let errors = error.response.data;
      Object.keys(errors).forEach((key) => {
        setFieldError(key, errors[key]);
      });
      setStatus({ code: 400 });
    }
  },
};

export const LoginForm = {
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  }),
  onSubmit: async (values, { setFieldError, setStatus }) => {
    const { email, password } = values;

    try {
      const res = await axios.post(
        import.meta.env.VITE_SITE_URL + "/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      cookies.set("token", `Bearer ${res.data.token}`);
      cookies.set("user", res.data.user);

      setStatus({ code: 201, data: res.data.user });
    } catch (error) {
      // Set all errors from the server
      let errors = error.response.data;
      Object.keys(errors).forEach((key) => {
        setFieldError(key, errors[key]);
      });
      setStatus({ code: 400 });
      if (!errors) setFieldError("server", error);
    }
  },
};
