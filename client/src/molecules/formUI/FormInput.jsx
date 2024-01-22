import { TextField } from "@mui/material";
import { useField } from "formik";

const FormInput = ({ label, ...props }) => {
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
      }}
      {...field}
      {...props}
    />
  );
};

export default FormInput;
