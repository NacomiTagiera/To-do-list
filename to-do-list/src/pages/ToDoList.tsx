import { useState } from "react";
import { useQuery, useMutation } from "react-query";

import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarQuickFilter,
  GridLinkOperator,
  GridEventListener,
} from "@mui/x-data-grid";
import { Alert, Box, Pagination, Typography } from "@mui/material";
import { Edit, HighlightOff } from "@mui/icons-material";

import queryClient from "../config/queryClient";
import { fetchListOfTodos, deleteTodo } from "../config/backendAPI";
import { Todo } from "../list/types/Todo";

import EditTodo from "./EditTodo";
import Loading from "./Loading";

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
      color="standard"
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

  const [todoToEdit, setTodoToEdit] = useState<Todo | undefined>(undefined);

  const styledDataGrid = {
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      "& .MuiDataGrid-row": {
        "&:nth-of-type(2n)": { backgroundColor: "#ff8a65" },
        "&:nth-of-type(2n-1)": { backgroundColor: "#ff7043" },
      },
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#ff8a65",
      fontSize: 16,
    },
    border: "none",
    color: "white",
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
      minWidth: 100,
    },
    {
      field: "createdAt",
      headerName: "Creation date",
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 150,
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
      renderCell() {
        return (
          <>
            <Edit color="primary" sx={iconStyles} onClick={() => 0} />
            <HighlightOff color="error" sx={iconStyles} onClick={() => 0} />
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
      <Alert severity="error">Sorry, an rror occured. Try again later</Alert>
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
      <EditTodo todo={todoToEdit} onClose={() => setTodoToEdit(undefined)} />
    </>
  );
}
