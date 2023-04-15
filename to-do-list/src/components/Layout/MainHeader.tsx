import { Box, Typography } from "@mui/material";

interface Props {
  text: string;
  numOfTasks?: number;
}

export default function MainHeader({ text, numOfTasks = 0 }: Props) {
  const subtitle =
    numOfTasks <= 0
      ? ""
      : `You've got ${numOfTasks} tasks coming up in the next days.`;

  return (
    <Box component="header" px={7} py={10}>
      <Typography variant="h2" component="h1">
        {text}
      </Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </Box>
  );
}
