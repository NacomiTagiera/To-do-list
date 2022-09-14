import { Card, Dialog } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { AddTaskPanel } from "./AddTaskPanel";
import { Todo } from "../list/types/Todo";

interface Props {
  todo: Todo | undefined;
  onClose: () => void;
}

export default function EditTodo({ todo, onClose }: Props) {
  return (
    <Dialog open={!!todo} onClose={onClose}>
      <Card
        variant="outlined"
        sx={{
          px: 3,
          py: 5,
        }}
      >
        <AddTaskPanel isInEditTodo={true} todo={todo} />
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
      </Card>
    </Dialog>
  );
}
