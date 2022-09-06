import { useNavigate } from "react-router-dom";

import { Box, Button, Stack, Typography } from "@mui/material";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h1" component="h1">
        My to-dos
      </Typography>
      <Stack flexDirection="row" spacing={2}>
        <Button onClick={() => navigate("/list")}>To-do list</Button>
        <Button onClick={() => navigate("/add")}>Add new task</Button>
      </Stack>
    </Box>
  );
};
