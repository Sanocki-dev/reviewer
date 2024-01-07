import axios from "axios";
import * as Yup from "yup";

export const RegisterSchema = {
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
};

export const LoginSchema = {
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  }),
};

export const Register = {
  onSubmit: async (values, { setFieldError, setStatus }) => {
    const { code, data } = await getPost("/register", values, setFieldError);

    // If it was a valid request set the token in storage
    if (code === 200) localStorage.setItem("token", data.token);
    setStatus({ code, data: data?.user });
  },
};

export const Login = {
  onSubmit: async (values, { setFieldError, setStatus, setErrors }) => {
    const { code, data } = await getPost(
      "/login",
      values,
      setFieldError,
      setErrors
    );

    // If it was a valid request set the token in storage
    if (code === 200) localStorage.setItem("token", data.token);
    setStatus({ code, data: data?.user });
  },
};

export const getPost = async (url, body, setFieldError, setErrors) => {
  try {
    const res = await axios.post(import.meta.env.VITE_SITE_URL + url, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    return { success: true, data: res.data };
  } catch (error) {
    let errors = error.response.data;

    if (error.response.status !== 400) {
      setErrors({ server: "Unable to complete request. Please try again" });
      return
    }

    Object.keys(errors).forEach((key) => {
      setFieldError(key, errors[key]);
    });

    return { data: error.response.data };
  }
};
