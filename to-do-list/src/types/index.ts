import { ObjectId } from "mongodb";

export interface TodoFormikValues {
  category: string;
  deadline: string;
  description: string;
  title: string;
}

export interface Todo extends TodoFormikValues {
  _id?: ObjectId;
  completed: boolean;
}
