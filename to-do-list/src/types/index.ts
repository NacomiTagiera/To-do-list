import { ObjectId } from "mongodb";

export interface Todo {
  _id?: ObjectId;
  category: string;
  completed: boolean;
  deadline: string;
  description: string;
  title: string;
}
export type FormValues = Omit<Todo, "_id" | "completed">;
