import { useNavigate } from "react-router-dom";

import { Box, Button, Stack, Typography } from "@mui/material";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "max-content",
        mx: "auto",
      }}
    >
      <Typography variant="h1" component="h1" sx={{ mb: 5 }}>
        My to-dos
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, md: 4 }}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="contained"
          size="large"
          sx={{ width: "max-content" }}
          onClick={() => navigate("/list")}
        >
          To-do list
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ width: "max-content" }}
          onClick={() => navigate("/add")}
        >
          Add new task
        </Button>
      </Stack>
    </Box>
  );
}
