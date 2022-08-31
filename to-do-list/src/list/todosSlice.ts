import {
  bindActionCreators,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Todo } from "./types/Todo";
import { Todos } from "./types/Todos";

const initialState: Todos = {
  todos: [
    {
      id: 0,
      category: "Dom",
      value: "Posprzątać swój pokój",
      priority: "normal",
      createdAt: "25/8/2022",
      isDone: false,
    },
    {
      id: 1,
      category: "Jedzenie",
      value: "Zrobić zakupy",
      priority: "major",
      createdAt: "26/8/2022",
      isDone: false,
    },
    {
      id: 2,
      category: "Zdrowie",
      value: "Pójść do lekarza",
      priority: "critical",
      createdAt: "27/8/2022",
      isDone: false,
    },
  ],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<Todo["id"]>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) => {
        if ((action.payload.id = todo.id)) {
          return action.payload;
        } else {
          return todo;
        }
      });
    },
  },
});

export const useGetTodos = (): Todo[] =>
  useAppSelector((state) => state.todos.todos);
export const useGetTodo = (todoId: number): Todo | undefined => {
  return useGetTodos().find((todo) => todo.id === todoId);
};

export const useDispatchTodos = () => {
  const { actions } = todosSlice;
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};

export default todosSlice.reducer;
