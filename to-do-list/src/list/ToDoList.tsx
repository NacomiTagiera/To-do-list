import { useState } from "react";

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
import { Box, Pagination, Typography } from "@mui/material";
import { Done, Edit, HighlightOff, Visibility } from "@mui/icons-material";

import { ToDoDetails } from "./ToDoDetails";
import { useDispatchTodos, useGetTodos } from "./todosSlice";
import { Todo } from "./types/Todo";

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
        placeholder="Szukaj..."
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

export const ToDoList = () => {
  const todos: Todo[] = useGetTodos();
  const { deleteTodo } = useDispatchTodos();

  const [todoToEdit, setTodoToEdit] = useState<Todo | undefined>(undefined);
  const [todoDetails, setTodoDetails] = useState<Todo | undefined>(undefined);

  const styledDataGrid = {
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      "& .MuiDataGrid-row": {
        "&:nth-of-type(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" },
      },
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "rgba(235, 235, 235, .7)",
      color: "rgba(0,0,255,0.6)",
      fontSize: 16,
    },
  };

  const iconStyles = {
    transition: ".3s",
    "&:hover": {
      opacity: "0.8",
      cursor: "pointer",
      transform: "scale(0.98)",
    },
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "category",
      headerName: "Category",
      type: "string",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "value",
      headerName: "Value",
      type: "string",
      flex: 2.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "priority",
      headerName: "Priority",
      type: "string",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell(cellValues) {
        return (
          <>
            <HighlightOff
              color="error"
              sx={iconStyles}
              onClick={() => {
                deleteTodo(cellValues.row.id);
              }}
            />
            <Edit
              color="primary"
              sx={iconStyles}
              onClick={() => {
                todos.forEach((todo) => {
                  if (cellValues.row.id === todo.id) setTodoToEdit(todo);
                });
              }}
            />
            <Visibility
              sx={iconStyles}
              onClick={() => {
                todos.forEach((todo) => {
                  if (cellValues.row.id === todo.id) setTodoDetails(todo);
                });
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Typography
        variant="h1"
        component="h1"
        sx={{ textAlign: "center", my: 5 }}
      >
        My to-do list
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
        rows={todos}
        columns={columns}
        pageSize={10}
        autoHeight={true}
        disableColumnMenu={true}
        disableSelectionOnClick={true}
        sx={styledDataGrid}
      />
      <ToDoDetails
        todo={todoDetails}
        onClose={() => setTodoDetails(undefined)}
      />
    </>
  );
};
