import { Card, Chip, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props {
  category: string;
  completed: boolean;
  deadline: Date;
  description: string;
  title: string;
}

export default function TodoItem({
  category,
  completed,
  deadline,
  description,
  title,
}: Props) {
  return (
    <Card
      variant="outlined"
      component="li"
      sx={{
        borderColor: completed ? "green" : "red",
        borderRadius: { xs: 3, md: 5 },
        px: { xs: 2, md: 3 },
        py: { xs: 1, md: 2 },
      }}
    >
      <IconButton sx={{ ml: "auto" }} onClick={() => {}} aria-label="Action">
        <MoreVertIcon color="primary" fontSize="large" />
      </IconButton>
      {!completed ?? (
        <Typography variant="body2" color="primary">
          {deadline.toLocaleDateString()}
        </Typography>
      )}
      <Typography
        variant="h4"
        sx={{
          color: completed ? "lightgray" : "black",
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1" color="gray">
        {description}
      </Typography>
      <Chip
        label={category.toUpperCase()}
        variant="outlined"
        sx={{ border: "gold", color: "lightgray" }}
      />
    </Card>
  );
}
