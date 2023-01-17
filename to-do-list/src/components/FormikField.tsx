import { useField } from "formik";
import { TextField } from "@mui/material";

import { FormikFieldProps } from "../types/main";

export default function FormikField({
  fieldName,
  label,
  placeholder,
  required = true,
  fieldType = "text",
}: FormikFieldProps) {
  const [field, meta] = useField(fieldName);

  return (
    <TextField
      name={field.name}
      error={meta.touched && !!meta.error}
      color={meta.touched && !!meta.error ? "error" : "primary"}
      required={required}
      label={label}
      value={field.value}
      placeholder={placeholder}
      helperText={meta.touched ? meta.error : ""}
      onChange={field.onChange}
      onBlur={field.onBlur}
      type={fieldType}
      autoComplete="off"
    />
  );
}
