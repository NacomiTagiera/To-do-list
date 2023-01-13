import axios, { AxiosRequestConfig } from "axios";

import { connection } from "./config";
import { ModifiedTodo, Todo, TodoFormikValues } from "../types/main";

const settings: AxiosRequestConfig = {
  baseURL: connection.baseURL.url,
  timeout: 2000,
};

const backendAPI = axios.create(settings);

const headers = {
  "Content-Type": "application/json",
  accept: "application/json",
};

const fetchData = async () => {
  const fetchedData = await backendAPI.get(`${connection.todos.url}.json`, {
    headers,
  });
  return fetchedData.data;
};

const fetchListOfTodos = async (): Promise<Todo[]> => {
  const response = await fetchData();
  return Object.values(response);
};

const createTodo = async (newTodo: Todo) => {
  backendAPI.post(`${connection.todos.url}.json`, newTodo);
};

const deleteTodo = async (todoId: number) => {
  const fetchedData = await fetchData();
  for (const [key, val] of Object.entries(fetchedData)) {
    if (val) {
      const value = val as Todo;
      if (todoId === value.id) {
        const response = await backendAPI.delete(
          `${connection.todos.url}/${key}.json`,
          {
            headers,
          }
        );
        return response.data;
      }
    }
  }
  return 0;
};

const editTodo = async (modifiedTodo: ModifiedTodo) => {
  const fetchedData = await fetchData();
  for (const [key, val] of Object.entries(fetchedData)) {
    if (val) {
      const value = val as Todo;
      if (modifiedTodo.id === value.id) {
        console.log(modifiedTodo.task);
        const response = await backendAPI({
          method: "patch",
          url: `${connection.todos.url}/${key}.json`,
          headers,
          data: {
            category: modifiedTodo.category,
            priority: modifiedTodo.priority,
            task: modifiedTodo.task,
          },
        });
        return response;
      }
    }
  }
  return 0;
};

export { createTodo, deleteTodo, editTodo, fetchListOfTodos, backendAPI };
