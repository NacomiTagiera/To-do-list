import { Button, Stack } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

import TodoItem from "./TodoItem";
import { Todo } from "@/types";

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
  return <div>TodoList</div>;
}
