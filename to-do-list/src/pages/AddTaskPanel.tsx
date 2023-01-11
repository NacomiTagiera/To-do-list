import { useState } from "react";
import { useMutation, useQuery } from "react-query";

import {
  Alert,
  Button,
  Card,
  Collapse,
  createTheme,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import FormikField from "../components/FormikField";
import { Todo } from "../list/types/Todo";
import { TodoFormikValues } from "../list/types/TodoFormikValues";

import queryClient from "../config/queryClient";
import { createTodo, fetchListOfTodos } from "../config/backendAPI";

interface Props {
  isInEditTodo?: boolean;
  todo?: Todo;
}

export default function AddTaskPanel({ isInEditTodo = false, todo }: Props) {
  const theme = createTheme();

  const [priority, setPriority] = useState<string>(
    !!todo ? todo.priority : "Normal"
  );
  const [displaySuccessInfo, setDisplaySuccessInfo] = useState<boolean>(false);
  const [displayErrorInfo, setDisplayErrorInfo] = useState<boolean>(false);

  const { data: todos } = useQuery("todos", fetchListOfTodos);

  const addTask = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const initialValues: TodoFormikValues = {
    category: todo?.category || "",
    task: todo?.task || "",
    priority: todo?.priority || priority,
  };

  const getFreeId = (todos: Todo[]): number => {
    return Math.max(...todos.map((todo) => todo.id)) + 1;
  };

  const onSubmit = (
    values: TodoFormikValues,
    actions: FormikHelpers<TodoFormikValues>
  ) => {
    addTask.mutate({
      id: getFreeId(todos ? todos : []),
      category: values.category,
      task: values.task,
      priority,
      createdAt: new Date().toISOString(),
      completed: false,
    });
    actions.resetForm();
    setDisplaySuccessInfo(true);
    setPriority("Normal");
    setTimeout(() => {
      setDisplaySuccessInfo(false);
      window.location.reload();
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string()
      .label("Category")
      .required()
      .trim("Delete leading and trailing spaces!")
      .strict(true)
      .min(3)
      .max(25),
    task: Yup.string()
      .label("Task")
      .required()
      .trim("Delete leading and trailing spaces!")
      .strict(true)
      .min(3)
      .max(60),
  });

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          backgroundColor: "",
          border: "2px solid lightgray",
          borderRadius: 5,
          boxShadow: 23,
          mx: "auto",
          p: 5,
          width: "min(90%, 500px)",
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Stack direction="column" spacing={4}>
            <Typography
              variant="h3"
              component="h3"
              sx={{ textAlign: "center" }}
            >
              {!!todo ? "Edit task" : "Add new task"}
            </Typography>
            <Form noValidate>
              <Stack
                direction="column"
                spacing={3}
                alignItems="center"
                justifyContent="center"
              >
                <FormikField
                  fieldName="category"
                  label="Category"
                  placeholder="e.g. School, Health, Home"
                />

                <FormikField fieldName="task" label="Task" placeholder="Task" />
                <FormControl>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priority}
                    label="Priority"
                    onChange={handlePriorityChange}
                  >
                    <MenuItem value="Critical">Critical</MenuItem>
                    <MenuItem value="Major">Major</MenuItem>
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="Minor">Minor</MenuItem>
                    <MenuItem value="Nice-to-have">Nice-to-have</MenuItem>
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {todo ? "Save" : "Submit"}
                </Button>
              </Stack>
            </Form>
          </Stack>
        </Formik>
        <Dialog open={displaySuccessInfo}>
          <Alert>Task has been successfully added!</Alert>
        </Dialog>
        <Collapse in={displayErrorInfo} mountOnEnter unmountOnExit>
          <Alert severity="error" onClose={() => setDisplayErrorInfo(false)}>
            An error occurred! Correct the input fields and try again.
          </Alert>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}
