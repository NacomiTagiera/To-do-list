import { Dialog } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import AddTaskPanel from "../pages/AddTaskPanel";
import { DialogProps } from "../types/main";

export default function EditTodo({ todo, onClose }: DialogProps) {
  return (
    <Dialog open={!!todo} onClose={onClose}>
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
    </Dialog>
  );
}
