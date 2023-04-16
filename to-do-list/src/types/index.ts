import { ObjectId } from "mongodb";

export interface Todo {
  _id?: ObjectId;
  category: string;
  completed: boolean;
  deadline: string;
  description: string;
  title: string;
}

export interface TodoFormikValues {
  category: string;
  deadline: Date;
  description: string;
  title: string;
}
