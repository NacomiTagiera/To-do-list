import { useState } from "react";

import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { Form } from "formik";
import FormikField from "../components/FormikField";

export const FormikForm = () => {
  const [priority, setPriority] = useState<string>("Normal");
  const theme = createTheme();

  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{ mb: 5, textAlign: "center" }}
          >
            Add new task
          </Typography>
          <Form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={10} sm={8}>
                <FormikField
                  fieldName="category"
                  label="Category"
                  placeholder="e.g. School, Cleaning, Health"
                />
              </Grid>
              <Grid item xs={2} sm={4}>
                <FormControl>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priority}
                    label="Priority"
                    onChange={handleChange}
                  >
                    <MenuItem value="Critical">Critical</MenuItem>
                    <MenuItem value="Major">Major</MenuItem>
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="Minor">Minor</MenuItem>
                    <MenuItem value="Nice-to-have">Nice-to-have</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormikField
                  fieldName="value"
                  label="Task"
                  placeholder="Task"
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
