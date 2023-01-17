import { ReactElement } from "react";

export interface AddTaskPanelProps {
  isInEditTodo?: boolean;
  todo?: Todo;
}

export interface DeleteTodoProps {
  todoToDelete: number | undefined;
  onClose: () => void;
}

export interface DialogProps {
  todo: Todo | undefined;
  onClose: () => void;
}

export type FormikFieldProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  required?: boolean;
  fieldType?: string;
};

export interface ModifiedTodo {
  id: number;
  category: string;
  priority: string;
  task: string;
}

export interface NavbarProps {
  window?: () => Window;
}

export interface Todo {
  id: number;
  category: string;
  task: string;
  priority: string;
  createdAt: string;
  completed: boolean;
}

export interface TodoFormikValues {
  category: string;
  task: string;
  priority: string;
}

export interface StyledTooltipProps {
  children: ReactElement;
  title: string;
}
