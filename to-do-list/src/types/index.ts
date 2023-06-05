import { ObjectId } from "mongodb";

export interface Collection {
  _id?: ObjectId;
  name: string;
  todos: Todo[];
}

export type CollectionFormValues = Pick<Collection, "name">;

export interface Todo {
  completed: boolean;
  deadline: string;
  title: string;
}

export type TodoFormValues = Omit<Todo, "completed">;
