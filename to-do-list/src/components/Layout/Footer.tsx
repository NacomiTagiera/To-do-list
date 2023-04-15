import Link from "next/link";

import { Facebook, GitHub, LinkedIn } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

const links = [
  {
    name: GitHub,
    site: "https://github.com/NacomiTagiera",
  },
  {
    name: LinkedIn,
    site: "https://www.linkedin.com/in/jakub-pawlak-frontend-dev",
  },
  {
    name: Facebook,
    site: "https://www.facebook.com/kubapawlak123321",
  },
];

export default function Footer() {
  return (
    <Box component="footer" p={6}>
      <Stack
        direction="row"
        spacing={5}
        alignItems="center"
        justifyContent="center"
      >
        {links.map((link, id) => (
          <Link
            key={id}
            href={link.site}
            target="_blank"
            aria-label={`Link to my ${link.name} profile`}
          >
            <link.name
              fontSize="large"
              color="primary"
              sx={{ "&:active": { color: "primary" } }}
            />
          </Link>
        ))}
      </Stack>
      <Typography variant="body1" component="p" textAlign="center">
        Copyright &copy; Jakub Pawlak {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
