import { useMutation } from "react-query";
import { Button, Card, Dialog, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { deleteTodo } from "../config/backendAPI";
import queryClient from "../config/queryClient";

interface Props {
  todoToDelete: number | undefined;
  onClose: () => void;
}

export default function DeleteTodo({ todoToDelete, onClose }: Props) {
  const deleteTodoMutation = useMutation(
    (todoId: number) => {
      return deleteTodo(todoId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  return (
    <Dialog open={!!todoToDelete}>
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
          sx={{ my: 3 }}
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