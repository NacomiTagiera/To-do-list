import { Card, Dialog, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { DialogProps } from "../types/main";

export default function TodoDetails({ todo, onClose }: DialogProps) {
  return (
    <Dialog open={!!todo} onClose={onClose}>
      <Card variant="outlined" sx={{ p: 4 }}>
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
        <Typography variant="h3" component="h3" textAlign="center" pb={2}>
          Details
        </Typography>
        {todo ? (
          <>
            {Object.entries(todo).map(([key, value]) => (
              <Typography variant="body1" key={key}>
                {`${key.charAt(0).toUpperCase() + key.slice(1)}`}:{" "}
                {value ? value : "false"}
              </Typography>
            ))}
          </>
        ) : (
          <Typography variant="h4" component="h4" color="error">
            Todo not found!
          </Typography>
        )}
      </Card>
    </Dialog>
  );
}
