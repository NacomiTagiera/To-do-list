import React from "react";

import { TextField } from "@mui/material";

import { useField } from "formik";

type Props = {
  fieldName: string;
  label: string;
  placeholder: string;
  required?: boolean;
  fieldType?: string;
};

const FormikField: React.FC<Props> = ({
  fieldName,
  label,
  placeholder,
  required = true,
  fieldType = "text",
}) => {
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
    />
  );
};

export default FormikField;
