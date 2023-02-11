import { useMutation } from "react-query";
import { Button, Card, Dialog, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { deleteTodo } from "../../api/backendAPI";
import queryClient from "../../api/queryClient";
import { DeleteTodoProps } from "../../types/main";

export default function DeleteTodo({ todoToDelete, onClose }: DeleteTodoProps) {
  const deleteTodoMutation = useMutation(
    (todoId: string) => {
      return deleteTodo(todoId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  return (
    <Dialog open={!!todoToDelete} onClose={onClose}>
      <Card variant="outlined" sx={{ px: 3, py: 5, textAlign: "center" }}>
        <CancelIcon
          color="action"
          onClick={onClose}
          sx={{
            position: "absolute",
            left: 10,
            top: 10,
            fontSize: 30,
            transition: "0.3s",
            "&:hover": {
              cursor: "pointer",
              opacity: 0.5,
              transform: "scale(0.95)",
            },
          }}
        />
        <Typography
          variant="body1"
          component="p"
          fontSize="2rem"
          fontWeight={700}
        >
          Are you sure you want to <span style={{ color: "red" }}>DELETE </span>
          this task?
        </Typography>
        <Typography variant="body2" component="p" sx={{ pt: 2 }}>
          This action can't be undone
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => {
            deleteTodoMutation.mutate(todoToDelete!);
            onClose();
          }}
        >
          CONFIRM
        </Button>
      </Card>
    </Dialog>
  );
}
