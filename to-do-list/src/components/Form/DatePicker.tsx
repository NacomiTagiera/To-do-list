import { useMemo, useState } from "react";

import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateValidationError } from "@mui/x-date-pickers/models";

const today = dayjs().format("ll");

export default function MyDatePicker() {
  const [deadline, setDeadline] = useState<string | null>(today);
  const [error, setError] = useState<DateValidationError | null>(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case "minDate": {
        return "Your task deadline can't be in the past";
      }

      case "invalidDate": {
        return "Your task deadline is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box width={300}>
        <DatePicker
          label="Deadline"
          value={deadline}
          format="ll"
          onChange={(newDeadline) => setDeadline(newDeadline)}
          onError={(newError) => setError(newError)}
          slotProps={{
            textField: {
              helperText: errorMessage,
            },
          }}
          minDate={today}
        />
      </Box>
    </LocalizationProvider>
  );
}
