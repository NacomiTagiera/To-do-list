export interface ModifiedTodo {
  id: number;
  category: string;
  priority: string;
  task: string;
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
