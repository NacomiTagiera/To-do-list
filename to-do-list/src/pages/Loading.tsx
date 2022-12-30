import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box textAlign="center">
      <Typography variant="h1" component="h1" pb={10}>
        Loading...
      </Typography>
      <CircularProgress size="4rem" />
    </Box>
  );
}
