import { useState } from "react";
import { useMutation, useQuery } from "react-query";

import {
  Alert,
  Box,
  Button,
  Collapse,
  createTheme,
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
  const [displayInfo, setDisplayInfo] = useState<boolean>(false);

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
    console.log(values);
    actions.resetForm();
    setDisplayInfo(true);
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string()
      .label("Category")
      .required()
      .trim("Incorrect format")
      .strict(true)
      .min(3)
      .max(25),
    task: Yup.string()
      .label("Task")
      .required()
      .trim("Incorrect format")
      .strict(true)
      .min(3)
      .max(60),
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mx: "auto", width: { md: "max-content" } }}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{ mb: 5, textAlign: "center" }}
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
          </Box>
        </Formik>
        <Collapse in={displayInfo} mountOnEnter unmountOnExit>
          <Alert severity="success" onClose={() => setDisplayInfo(false)}>
            {isInEditTodo
              ? "Todo was successfully edited!"
              : "Todo was successfully added!"}
          </Alert>
        </Collapse>
      </Box>
    </ThemeProvider>
  );
}
