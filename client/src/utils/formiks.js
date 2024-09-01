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
    userName: "",
    password: "",
  },
  validationSchema: Yup.object({
    userName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  }),
};
