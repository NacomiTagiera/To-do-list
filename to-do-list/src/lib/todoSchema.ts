import * as yup from "yup";

const todoSchema = yup.object().shape({
  category: yup
    .string()
    .label("Category")
    .required()
    .trim()
    .strict(true)
    .min(2)
    .max(30),
  title: yup
    .string()
    .label("Title")
    .required()
    .trim()
    .strict(true)
    .min(2)
    .max(50),
  description: yup
    .string()
    .label("Dategory")
    .required()
    .trim()
    .strict(true)
    .min(2)
    .max(255),
  deadline: yup
    .date()
    .label("Deadline")
    .required()
    .min(new Date(), "Deadline must be in the future"),
});

export default todoSchema;
