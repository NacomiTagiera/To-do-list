import { Button, Dialog, Paper, Typography } from "@mui/material";

import { Todo } from "./types/Todo";

interface Props {
  todo: Todo | undefined;
  onClose: () => void;
}

export const ToDoDetails = ({ todo, onClose }: Props) => {
  return (
    <Dialog open={!!todo} onClose={onClose}>
      <Paper variant="elevation" sx={{ py: 5, px: 3 }}>
        {todo ? (
          <>
            <Typography
              variant="h3"
              component="h3"
              sx={{ textAlign: "center", pb: 1 }}
            >
              Details
            </Typography>
            <Typography>Category: {todo.category}</Typography>
            <Typography>Value: {todo.value}</Typography>
            <Typography>Priority: {todo.priority}</Typography>
            <Typography>
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </Typography>
            <Typography>Status: {todo.isDone}</Typography>
            <Button
              sx={{ display: "block", mx: "auto", mt: 1 }}
              onClick={onClose}
            >
              Close
            </Button>
          </>
        ) : (
          <Typography>Not Found</Typography>
        )}
      </Paper>
    </Dialog>
  );
};
