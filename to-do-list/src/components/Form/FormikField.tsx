import { useField } from "formik";
import { TextField } from "@mui/material";

interface Props {
  fieldName: string;
  fieldType?: string;
  label: string;
  multiline?: boolean;
  placeholder: string;
  required?: boolean;
}

export default function FormikField({
  fieldName,
  fieldType = "text",
  label,
  multiline = false,
  placeholder,
  required = true,
}: Props) {
  const [field, meta] = useField(fieldName);

  return (
    <TextField
      autoCorrect="off"
      color={meta.touched && !!meta.error ? "error" : "primary"}
      error={meta.touched && !!meta.error}
      helperText={meta.touched ? meta.error : ""}
      label={label}
      multiline={multiline}
      name={field.name}
      onBlur={field.onBlur}
      onChange={field.onChange}
      placeholder={placeholder}
      required={required}
      type={fieldType}
      value={field.value}
    />
  );
}
