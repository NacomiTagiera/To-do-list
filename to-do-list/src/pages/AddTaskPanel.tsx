import { useState } from "react";
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
import { TodoFormikValues } from "../form/types/TodoFormikValues";
import { useDispatchTodos, useGetTodos } from "../list/todosSlice";

export const AddTaskPanel = () => {
  const theme = createTheme();

  const [priority, setPriority] = useState<string>("Normal");
  const [displayTodoAddedInfo, setDisplayTodoAddedInfo] =
    useState<boolean>(false);

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const initialValues: TodoFormikValues = {
    category: "",
    priority: "Normal",
    value: "",
  };

  const todos: Todo[] = useGetTodos();
  const { addTodo } = useDispatchTodos();

  const getFreeId = (todos: Todo[]): number => {
    return todos ? Math.max(...todos.map((todo) => todo.id)) + 1 : 0;
  };

  const createTodo = (
    category: string,
    priority: string,
    value: string,
    prevTodos: Todo[]
  ): Todo => {
    const newId: number = getFreeId(prevTodos);
    const creationDate: string = new Date().toISOString();
    return {
      id: newId,
      category: category,
      priority: priority,
      value: value,
      createdAt: creationDate,
      isDone: false,
    };
  };

  const onSubmit = (
    values: TodoFormikValues,
    actions: FormikHelpers<TodoFormikValues>
  ) => {
    actions.resetForm();
    addTodo(createTodo(values.category, priority, values.value, todos));
    setDisplayTodoAddedInfo(true);
  };

  const validationSchema = Yup.object({
    category: Yup.string()
      .label("Category")
      .required()
      .trim("Incorrect format")
      .strict(true)
      .min(3)
      .max(25),
    value: Yup.string()
      .label("Task")
      .required()
      .trim("Incorrect format")
      .strict(true)
      .min(3)
      .max(60)
      .notOneOf(
        todos.map((todo) => todo.value),
        "This task already exists"
      ),
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mx: "auto", width: { xs: "100vw", md: "max-content" } }}>
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
              Add new task
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
                  placeholder="e.g. School, Cleaning, Health"
                />

                <FormikField
                  fieldName="value"
                  label="Task"
                  placeholder="Task"
                />
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
                  Submit
                </Button>
              </Stack>
            </Form>
          </Box>
        </Formik>
        <Collapse in={displayTodoAddedInfo} mountOnEnter unmountOnExit>
          <Alert
            severity="success"
            onClose={() => setDisplayTodoAddedInfo(false)}
          >
            Todo was successfully added!
          </Alert>
        </Collapse>
      </Box>
    </ThemeProvider>
  );
};
