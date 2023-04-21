import { useState } from "react";

import axios, { AxiosError } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import {
  Alert,
  Button,
  Card,
  createTheme,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";

import MyDatePicker from "./DatePicker";
import FormikField from "./FormikField";

import { addTodo, editTodo } from "@/lib/controller";
import todoSchema from "@/lib/todoSchema";
import { Todo, TodoFormikValues } from "@/types";

interface Props {
  todoToEdit?: Todo;
}

const theme = createTheme();

export default function TodoForm({ todoToEdit = undefined }: Props) {
  const [displaySuccessInfo, setDisplaySuccessInfo] = useState<boolean>(false);
  const [displayErrorInfo, setDisplayErrorInfo] = useState<boolean>(false);

  const initialValues: TodoFormikValues = {
    category: todoToEdit?.category || "",
    deadline: todoToEdit?.deadline || "",
    description: todoToEdit?.description || "",
    title: todoToEdit?.title || "",
  };

  const onSubmit = (
    values: TodoFormikValues,
    actions: FormikHelpers<TodoFormikValues>
  ) => {
    if (!todoToEdit) {
    } else {
    }
    setDisplaySuccessInfo(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={displaySuccessInfo}
        autoHideDuration={6000}
        onClose={() => setDisplaySuccessInfo(false)}
      >
        <Alert severity="success">
          Task has been successfully {todoToEdit ? "saved" : "added"}!
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={6000}
        onClose={() => setDisplayErrorInfo(false)}
      >
        <Alert severity="error">
          An error occurred! Correct the input fields and try again.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
