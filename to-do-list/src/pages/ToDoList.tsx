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
import { Done, Edit, HighlightOff } from "@mui/icons-material";

import { useDispatchTodos, useGetTodos } from "../list/todosSlice";
import { Todo } from "../list/types/Todo";
import EditTodo from "./EditTodo";

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

export const ToDoList = () => {
  const todos: Todo[] = useGetTodos();
  const { deleteTodo, toggleIsDone } = useDispatchTodos();

  const [todoToEdit, setTodoToEdit] = useState<Todo | undefined>(undefined);

  const styledDataGrid = {
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      "& .MuiDataGrid-row": {
        "&:nth-of-type(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" },
      },
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "rgba(235, 235, 235, .7)",
      color: "rgba(0, 0, 255, .6)",
      fontSize: 16,
    },
    "& .MuiDataGrid-cell:hover": {
      color: "primary.main",
    },
    boxShadow: 23,
    border: 2,
    borderColor: "primary.light",
    width: "max(700px, 100vw)",
    mx: "auto",
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
      field: "category",
      headerName: "Category",
      type: "string",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "value",
      headerName: "Task",
      type: "string",
      flex: 2.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "priority",
      headerName: "Priority",
      type: "string",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "createdAt",
      headerName: "Creation date",
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
      flex: 1.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "isDone",
      headerName: "Status",
      //type: 'boolean', nie dodałem tej linijki, ponieważ wtedy w kolumnie Status zamiast Done lub In progress mam symbol ptaszka albo X, a tego nie chcę
      valueFormatter({ value }) {
        return value === true ? "Done" : "In progress";
      },
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell(cellValues) {
        return (
          <>
            <Done
              color="success"
              sx={iconStyles}
              onClick={() => {
                toggleIsDone(cellValues.row.id);
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
            <HighlightOff
              color="error"
              sx={iconStyles}
              onClick={() => {
                deleteTodo(cellValues.row.id);
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
        rows={todos}
        columns={columns}
        pageSize={10}
        autoHeight={true}
        disableColumnMenu={true}
        disableSelectionOnClick={true}
        sx={styledDataGrid}
      />
      <EditTodo todo={todoToEdit} onClose={() => setTodoToEdit(undefined)} />
    </>
  );
};
