import { useState } from "react";
import { useQuery } from "react-query";

import { Alert, AlertTitle, Typography } from "@mui/material";

import { fetchListOfTodos } from "../api/backendAPI";
import { Todo } from "../types/main";

import DeleteTodo from "../components/Todo/DeleteTodo";
import EditTodo from "../components/Todo/EditTodo";
import Loading from "./Loading";
import MyDataGrid from "../components/DataGrid";
import TodoDetails from "../components/Todo/TodoDetails";

export default function ToDoList() {
  const {
    isError,
    isLoading,
    data: todos,
  } = useQuery("todos", fetchListOfTodos);

  const [todoToDelete, setTodoToDelete] = useState<string | undefined>(
    undefined
  );
  const [todoDetails, setTodoDetails] = useState<Todo | undefined>(undefined);
  const [todoToEdit, setTodoToEdit] = useState<Todo | undefined>(undefined);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Alert severity="error" variant="filled" sx={{ m: "auto" }}>
        <AlertTitle>Error</AlertTitle>
        Sorry, an error occured. Try again later.
      </Alert>
    );
  }

  return (
    <>
      <Typography variant="h1" component="h1" my={5} textAlign="center">
        To-do list
      </Typography>
      <MyDataGrid
        data={todos}
        onDeleteIconClick={(cellValues) => setTodoToDelete(cellValues.row.id)}
        onDetailsIconClick={(cellValues) =>
          setTodoDetails(todos?.find((todo) => todo.id === cellValues.row.id))
        }
        onEditIconClick={(cellValues) =>
          setTodoToEdit(todos?.find((todo) => todo.id === cellValues.row.id))
        }
      />
      <DeleteTodo
        todoToDelete={todoToDelete}
        onClose={() => setTodoToDelete(undefined)}
      />
      <EditTodo todo={todoToEdit} onClose={() => setTodoToEdit(undefined)} />
      <TodoDetails
        todo={todoDetails}
        onClose={() => setTodoDetails(undefined)}
      />
    </>
  );
}
