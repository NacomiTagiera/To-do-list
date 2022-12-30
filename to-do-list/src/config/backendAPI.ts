import axios, { AxiosRequestConfig } from "axios";

import { connection } from "./config";
import { Todo } from "../list/types/Todo";
import { TodoFormikValues } from "../list/types/TodoFormikValues";

const settings: AxiosRequestConfig = {
  baseURL: connection.baseURL.url,
  timeout: 2000,
};

const backendAPI = axios.create(settings);

const headers = {
  "Content-Type": "application/json",
  accept: "application/json",
};

const fetchListOfTodos = async (): Promise<Todo[]> => {
  const response = await backendAPI.get(connection.todos.url, { headers });
  return Object.values(response.data);
};

const createTodo = async (newTodo: Todo) => {
  backendAPI.post(connection.todos.url, newTodo);
};

const deleteTodo = async (todoId: string) => {
  const response = await backendAPI.delete(
    `${connection.todos.url}/${todoId}`,
    {
      headers,
    }
  );
  return response.data;
};

const editTodo = async (modifiedTodo: TodoFormikValues, todoId: string) => {
  const response = await backendAPI.patch(`${connection.todos.url}/${todoId}`, {
    headers,
    data: {
      category: modifiedTodo.category,
      task: modifiedTodo.task,
      priority: modifiedTodo.priority,
    },
  });
  return response;
};

export { createTodo, deleteTodo, editTodo, fetchListOfTodos, backendAPI };
