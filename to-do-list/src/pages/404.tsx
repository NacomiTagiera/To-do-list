import Link from "next/link";
import { Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="80vh"
      px={2}
      spacing={2}
    >
      <Typography variant="h4" component="h1">
        Oops! This page could not be found.
      </Typography>
      <Typography variant="subtitle1">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Link href="/">Go back to the homepage</Link>
    </Stack>
  );
}
