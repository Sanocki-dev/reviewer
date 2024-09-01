import { TextField } from "@mui/material";
import { useField } from "formik";
import { useSelector } from "react-redux";

const FormInput = ({ label, ...props }) => {
  const mode = useSelector((state) => state.mode);
  const [field, meta] = useField(props);

  return (
    <TextField
      htmlFor={props.id || props.name}
      className="text-input"
      label={label}
      fullWidth
      error={Boolean(meta.touched && meta.error)}
      helperText={(meta.touched && meta.error && meta.error) || " "}
      sx={{
        "& p": {
          height: 10,
        },
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #266798 inset",
            WebkitTextFillColor: mode === "dark" ? "white" : "black",
          },
        },
      }}
      {...field}
      {...props}
    />
  );
};

export default FormInput;
