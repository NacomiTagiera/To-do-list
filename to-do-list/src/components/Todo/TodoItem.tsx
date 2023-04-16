import { useState } from "react";

import {
  Card,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props {
  category: string;
  completed: boolean;
  deadline: string;
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
      <Stack direction="row" justifyContent="space-between">
        <Chip label={deadline} variant="outlined" color="primary" />
        <IconButton onClick={() => {}} aria-label="Toggle options menu">
          <MoreVertIcon />
        </IconButton>
      </Stack>
      {!completed ?? (
        <Typography variant="body2" color="primary">
          {deadline}
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
      <Typography
        variant="body1"
        color="gray"
        py={1}
        sx={{
          overflowWrap: "break-word",
          hyphens: "manual",
        }}
      >
        {description}
      </Typography>
      <Chip
        label={category.toUpperCase()}
        color="info"
        sx={{ float: "right" }}
      />
    </Card>
  );
}
