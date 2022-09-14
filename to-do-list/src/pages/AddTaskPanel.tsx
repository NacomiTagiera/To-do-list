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

interface Props {
  isInEditTodo?: boolean;
  todo?: Todo;
}

export const AddTaskPanel = ({ todo }: Props) => {
  const theme = createTheme();

  const [priority, setPriority] = useState<string>(
    !!todo ? todo.priority : "Normal"
  );
  const [displayTodoAddedInfo, setDisplayTodoAddedInfo] =
    useState<boolean>(false);
  const [displayTodoEditedInfo, setDisplayTodoEditedInfo] =
    useState<boolean>(false);

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const initialValues: TodoFormikValues = {
    category: todo?.category || "",
    value: todo?.value || "",
  };

  const todos: Todo[] = useGetTodos();
  const { addTodo, editTodo } = useDispatchTodos();

  const getFreeId = (todos: Todo[]): number => {
    return !!todos ? Math.max(...todos.map((todo) => todo.id)) + 1 : 0;
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
    if (!!todo) {
      setDisplayTodoEditedInfo(true);
      editTodo({
        ...todo,
        category: values.category,
        value: values.value,
        priority: priority,
      });
    } else {
      setDisplayTodoAddedInfo(true);
      addTodo(createTodo(values.category, priority, values.value, todos));
      actions.resetForm();
    }
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
        <Collapse in={displayTodoEditedInfo} mountOnEnter unmountOnExit>
          <Alert
            severity="success"
            onClose={() => setDisplayTodoEditedInfo(false)}
          >
            Todo was successfully edited!
          </Alert>
        </Collapse>
      </Box>
    </ThemeProvider>
  );
};
