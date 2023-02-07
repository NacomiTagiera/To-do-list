import { useState } from "react";
import { useQuery } from "react-query";

import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import { Alert, AlertTitle, Box, Pagination, Typography } from "@mui/material";
import { Edit, HighlightOff, Visibility } from "@mui/icons-material";

import { fetchListOfTodos } from "../api/backendAPI";
import { Todo } from "../types/main";

import DeleteTodo from "../components/DeleteTodo";
import EditTodo from "../components/EditTodo";
import Loading from "./Loading";
import StyledTooltip from "../components/StyledTooltip";
import TodoDetails from "../components/TodoDetails";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        textAlign: "center",
      }}
    >
      <GridToolbarQuickFilter
        placeholder="Search..."
        quickFilterParser={(searchInput: string) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default function ToDoList() {
  const {
    isError,
    isLoading,
    data: todos,
  } = useQuery("todos", fetchListOfTodos);

  const [todoToDelete, setTodoToDelete] = useState<string | undefined>(
    undefined
  );
  const [todoDetails, setTodoDetails] = useState<Todo | undefined>(undefined);
  const [todoToEdit, setTodoToEdit] = useState<Todo | undefined>(undefined);

  const styledDataGrid = {
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      "& .MuiDataGrid-row": {
        "&:nth-of-type(2n)": { backgroundColor: "lightgray" },
        "&:nth-of-type(2n-1)": { backgroundColor: "#eee" },
      },
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "lightgray",
      color: "primary.dark",
      fontSize: 16,
    },
    border: "none",
    mx: "auto",
  };

  const iconStyles = {
    transition: "0.3s",
    "&:hover": {
      opacity: "0.7",
      cursor: "pointer",
      transform: "scale(0.95)",
    },
  };

  const columns: GridColDef[] = [
    {
      field: "category",
      headerName: "Category",
      type: "string",
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "task",
      headerName: "Task",
      type: "string",
      align: "center",
      headerAlign: "center",
      flex: 2,
      minWidth: 100,
    },
    {
      field: "priority",
      headerName: "Priority",
      type: "string",
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "createdAt",
      headerName: "Creation date",
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "completed",
      headerName: "Completed",
      type: "boolean",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
      renderCell(cellValues) {
        return (
          <>
            <StyledTooltip title="Edit">
              <Edit
                color="primary"
                sx={iconStyles}
                onClick={() => {
                  setTodoToEdit(
                    todos?.find((todo) => todo.id === cellValues.row.id)
                  );
                }}
              />
            </StyledTooltip>
            <StyledTooltip title="Details">
              <Visibility
                color="info"
                sx={iconStyles}
                onClick={() => {
                  setTodoDetails(
                    todos?.find((todo) => todo.id === cellValues.row.id)
                  );
                }}
              />
            </StyledTooltip>
            <StyledTooltip title="Delete">
              <HighlightOff
                color="error"
                sx={iconStyles}
                onClick={() => {
                  setTodoToDelete(cellValues.row.id);
                }}
              />
            </StyledTooltip>
          </>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Alert severity="error" variant="filled" sx={{ m: "auto" }}>
        <AlertTitle>Error</AlertTitle>
        Sorry, an error occured. Try again later.
      </Alert>
    );
  }

  return (
    <>
      <Typography variant="h1" component="h1" my={5} textAlign="center">
        To-do list
      </Typography>
      <DataGrid
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLinkOperator.Or,
            },
          },
        }}
        components={{
          Pagination: CustomPagination,
          Toolbar: QuickSearchToolbar,
        }}
        pagination
        rows={todos ? todos : []}
        columns={columns}
        density="comfortable"
        pageSize={10}
        autoHeight
        columnBuffer={2}
        columnThreshold={2}
        disableColumnMenu
        disableSelectionOnClick
        sx={styledDataGrid}
      />
      <DeleteTodo
        todoToDelete={todoToDelete}
        onClose={() => setTodoToDelete(undefined)}
      />
      <EditTodo todo={todoToEdit} onClose={() => setTodoToEdit(undefined)} />
      <TodoDetails
        todo={todoDetails}
        onClose={() => setTodoDetails(undefined)}
      />
    </>
  );
}
