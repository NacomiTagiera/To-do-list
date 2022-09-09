import { useState } from "react";
import { Alert, Box, Collapse, SelectChangeEvent } from "@mui/material";

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { FormikForm } from "../form/FormikForm";
import { Todo } from "../list/types/Todo";
import { TodoFormikValues } from "../form/types/TodoFormikValues";
import { useDispatchTodos, useGetTodos } from "../list/todosSlice";

export const AddTaskPanel = () => {
  const [displayTodoAddedInfo, setDisplayTodoAddedInfo] =
    useState<boolean>(false);

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
    addTodo(createTodo(values.category, values.priority, values.value, todos));
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
    <Box sx={{ mx: "auto", width: { xs: "100vw", md: "max-content" } }}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <FormikForm />
      </Formik>
      <Collapse in={displayTodoAddedInfo}>
        <Alert severity="success">Todo was successfully added!</Alert>
      </Collapse>
    </Box>
  );
};
