import { FormValues, Todo } from "@/types";

const API_URL = "http://localhost:3000/api/todos";

export const fetchListOFTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.todos;
};

export const fetchTodo = async (todoId: string): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${todoId}`);
  const todo = await response.json();
  return todo;
};

export const createTodo = async (FormData: FormValues) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(FormData),
  }).then((response) => response.json());

export const deleteTodo = async (todoId: string) =>
  fetch(`${API_URL}/${todoId}`, { method: "DELETE" }).then((response) =>
    response.json()
  );

// export const updateTodo = async (todoId: string) => fetch(`${API_URL}/${todoId}`,)
