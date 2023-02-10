import { DataGrid, GridColDef, GridLinkOperator } from "@mui/x-data-grid";
import { GridRenderCellParams } from "@mui/x-data-grid/models";
import { lighten } from "@mui/material";
import { Edit, HighlightOff, Visibility } from "@mui/icons-material";

import { Todo } from "../../types/main";
import CustomPagination from "./CustomPagination";
import QuickSearchToolbar from "./QuickSearchToolbar";
import StyledTooltip from "./StyledTooltip";

interface Props {
  data: Todo[] | undefined;
  onDeleteIconClick: (cellValues: GridRenderCellParams) => void;
  onDetailsIconClick: (cellValues: GridRenderCellParams) => void;
  onEditIconClick: (cellValues: GridRenderCellParams) => void;
}

export default function MyDataGrid({
  data,
  onDeleteIconClick,
  onDetailsIconClick,
  onEditIconClick,
}: Props) {
  const styledDataGrid = {
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      "& .MuiDataGrid-row": {
        "&.row-is-completed--false": {
          backgroundColor: lighten("#ef5350", 0.2),
          "&:hover": {
            backgroundColor: lighten("#ef5350", 0.3),
          },
        },
        "&.row-is-completed--true": {
          backgroundColor: lighten("#4caf50", 0.2),
          "&:hover": {
            backgroundColor: lighten("#4caf50", 0.3),
          },
        },
        color: "#fff",
      },
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "lightgray",
      color: "primary.dark",
      fontSize: "1.2rem",
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
                onClick={() => onEditIconClick(cellValues)}
              />
            </StyledTooltip>
            <StyledTooltip title="Details">
              <Visibility
                color="info"
                sx={iconStyles}
                onClick={() => onDetailsIconClick(cellValues)}
              />
            </StyledTooltip>
            <StyledTooltip title="Delete">
              <HighlightOff
                color="error"
                sx={iconStyles}
                onClick={() => onDeleteIconClick(cellValues)}
              />
            </StyledTooltip>
          </>
        );
      },
    },
  ];

  return (
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
      rows={data ? data : []}
      columns={columns}
      density="comfortable"
      pageSize={10}
      autoHeight
      columnBuffer={2}
      columnThreshold={2}
      disableColumnMenu
      disableSelectionOnClick
      getRowClassName={(params) => `row-is-completed--${params.row.completed}`}
      sx={styledDataGrid}
    />
  );
}
