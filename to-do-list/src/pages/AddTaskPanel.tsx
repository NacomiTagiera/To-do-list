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

import { AxiosError } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import FormikField from "../components/FormikField";
import {
  AddTaskPanelProps,
  ModifiedTodo,
  Todo,
  TodoFormikValues,
} from "../types/main";

import queryClient from "../config/queryClient";
import { createTodo, editTodo, fetchListOfTodos } from "../config/backendAPI";

export default function AddTaskPanel({
  isInEditTodo = false,
  todo,
}: AddTaskPanelProps) {
  const theme = createTheme();

  const [priority, setPriority] = useState<string>(
    todo ? todo.priority : "Normal"
  );
  const [displaySuccessInfo, setDisplaySuccessInfo] = useState<boolean>(false);
  const [displayErrorInfo, setDisplayErrorInfo] = useState<boolean>(false);

  const { data: todos } = useQuery("todos", fetchListOfTodos);

  const { mutate: createTodoMutation } = useMutation(
    (newTodo: Todo) => {
      return createTodo(newTodo);
    },
    {
      onSuccess: (response: any) => {
        if (response instanceof AxiosError) {
          setDisplayErrorInfo(true);
        } else {
          queryClient.invalidateQueries(["todos"]);
        }
      },
      onError: () => {
        setDisplayErrorInfo(true);
      },
    }
  );

  const { mutate: editTodoMutation } = useMutation(
    (modifiedTodo: ModifiedTodo) => {
      return editTodo(modifiedTodo);
    },
    {
      onSuccess: (response: any) => {
        if (response instanceof AxiosError) {
          setDisplayErrorInfo(true);
        } else {
          queryClient.invalidateQueries(["todos"]);
        }
      },
      onError: () => {
        setDisplayErrorInfo(true);
      },
    }
  );

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const initialValues: TodoFormikValues = {
    category: todo?.category || "",
    task: todo?.task || "",
    priority: todo?.priority || priority,
  };

  const getFreeId = (todos: Todo[]): number => {
    return todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 0;
  };

  const onSubmit = (
    values: TodoFormikValues,
    actions: FormikHelpers<TodoFormikValues>
  ) => {
    if (!todo) {
      createTodoMutation({
        id: getFreeId(todos ? todos : []),
        category: values.category,
        task: values.task,
        priority,
        createdAt: new Date().toISOString(),
        completed: false,
      });
    } else {
      editTodoMutation({
        id: todo.id,
        category: values.category,
        task: values.task,
        priority,
      });
    }
    actions.resetForm();
    setDisplaySuccessInfo(true);
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
          border: "2px solid lightgray",
          borderRadius: todo ? 0 : 5,
          boxShadow: todo ? 0 : 23,
          mx: todo ? 0 : "auto",
          p: 5,
          width: todo ? "100%" : "min(90%, 500px)",
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
              {todo ? "Edit task" : "Add new task"}
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
          <Alert>Task has been successfully {todo ? "saved" : "added"}!</Alert>
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
