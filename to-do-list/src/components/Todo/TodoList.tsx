import { Button, Stack } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

import TodoItem from "./TodoItem";
import { Todo } from "@/types";

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      component="ul"
      sx={{
        listStyleType: "none",
        mx: "auto",
        my: 10,
        width: { xs: "92%", md: "75%" },
      }}
    >
      {todos.map((todo) => (
        <TodoItem
          key={todo.title}
          category={todo.category}
          completed={todo.completed}
          deadline={todo.deadline}
          description={todo.description}
          title={todo.title}
        />
      ))}
    </Stack>
  );
}
