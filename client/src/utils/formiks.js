import axios from "axios";
import * as Yup from "yup";

export const Register = {
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
    const { code, data } = await getPost("/register", values, setFieldError);

    // If it was a valid request set the token in storage
    if (code === 200) localStorage.setItem("token", data.token);
    setStatus({ code, data: data?.user });
  },
};

export const Login = {
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  }),
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

const getPost = async (url, body, setFieldError, setErrors) => {
  try {
    const res = await axios.post(import.meta.env.VITE_SITE_URL + url, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    return { code: 200, data: res.data };
  } catch (error) {
    let errors = error.response.data;

    Object.keys(errors).forEach((key) => {
      setFieldError(key, errors[key]);
    });

    if (error.response.status !== 400) {
      setErrors({ server: "Unable to complete request. Please try again" });
      console.log(error.response);
    }

    return { code: 400, data: error.response.data };
  }
};
