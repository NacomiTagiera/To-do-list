import { useState } from "react";
import { Alert, Box, Collapse } from "@mui/material";

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Todo } from "../list/types/Todo";
import { FormikForm } from "./FormikForm";
import { TodoFormikValues } from "./types/TodoFormikValues";
import { useDispatchTodos, useGetTodos } from "../list/todosSlice";

export const AddTaskForm = () => {
  const [displayAlertInfo, setDisplayAlertInfo] = useState<boolean>(false);
  const [displayTodoAddedInfo, setDisplayTodoAddedInfo] = useState<boolean>(false);

  const initialValues: TodoFormikValues = {
    category: "",
    priority: "",
    value: "",
  };

  const todos: Todo[] = useGetTodos();
  const { addTodo } = useDispatchTodos();

  const getFreeId = (todos: Todo[]): number => {
    return todos ? Math.max(...todos.map((todo) => todo.id)) + 1 : 0;
  };

  const createTodo = (category: string, priority: string, value: string, prevTodos: Todo[]): Todo => {
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

  const onSubmit = (values: TodoFormikValues, actions: FormikHelpers<TodoFormikValues>) => {
    actions.resetForm();
    addTodo(createTodo(values.category, values.priority, values.value, todos));
    setDisplayTodoAddedInfo(true);
    setDisplayAlertInfo(false);
  };

  const validationSchema = Yup.object({
    category: Yup.string()
      .label("Category")
      .required()
      .trim("This field cannot include leading and trailing spaces")
      .strict(true)
      .min(3)
      .max(30),
    value: Yup.string()
      .label("Content")
      .required()
      .trim("This field cannot include leading and trailing spaces")
      .strict(true)
      .min(3)
      .max(50)
      .notOneOf(todos.map((todo) => todo.value)),
  });

  return (
    <Box sx={{ m: 2, p: 3, width: 500 }}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <FormikForm />
      </Formik>
      <Collapse in={displayAlertInfo}>
        <Alert severity="error">Correct input fields and try again</Alert>
      </Collapse>
      <Collapse in={displayTodoAddedInfo}>
        <Alert severity="success">Todo was successfully added!</Alert>
      </Collapse>
    </Box>
  );
};
