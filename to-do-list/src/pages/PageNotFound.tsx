import { Box, Typography } from "@mui/material";

export default function PageNotFound() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" component="h1">
        404 Page not found
      </Typography>
    </Box>
  );
}
