import axios, { AxiosRequestConfig } from "axios";

import { connection } from "./config";
import { ModifiedTodo, Todo, TodoWithoutId } from "../types/main";

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
  const response = await backendAPI.get(`${connection.todos.url}.json`, {
    headers,
  });
  const results: Todo[] = [];
  for (const [key, value] of Object.entries(response.data)) {
    if (value) {
      const todo = value as Todo;
      results.push({
        category: todo.category,
        completed: todo.completed,
        createdAt: todo.createdAt,
        id: key,
        priority: todo.priority,
        task: todo.task,
      });
    }
  }
  return results;
};

const createTodo = async (newTodo: TodoWithoutId) => {
  backendAPI.post(`${connection.todos.url}.json`, newTodo);
};

const deleteTodo = async (todoId: string) => {
  const response = await backendAPI.delete(
    `${connection.todos.url}/${todoId}.json`,
    { headers }
  );
  return response.data;
};

const editTodo = async (modifiedTodo: ModifiedTodo) => {
  const response = await backendAPI({
    method: "patch",
    url: `${connection.todos.url}/${modifiedTodo.id}.json`,
    headers,
    data: {
      category: modifiedTodo.category,
      priority: modifiedTodo.priority,
      task: modifiedTodo.task,
    },
  });
  return response;
};

export { backendAPI, createTodo, deleteTodo, editTodo, fetchListOfTodos };
