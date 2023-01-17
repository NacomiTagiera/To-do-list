import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center">
      <Typography variant="h3" component="h3" p={5}>
        Sorry, the page you're trying to reach doesn't exist
      </Typography>
      <Button variant="contained" color="info" onClick={() => navigate("/")}>
        <ArrowCircleLeftIcon sx={{ marginRight: 1 }} />
        Back to home page
      </Button>
    </Box>
  );
}
