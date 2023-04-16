import { ObjectId } from "mongodb";

import connectToDatabase from "./connection";
import { Todo } from "@/types";

const { MONGODB_COLLECTION = "" } = process.env;

export const getTodos = async (): Promise<Todo[]> => {
  const db = await connectToDatabase();

  const data = (await db
    .collection(MONGODB_COLLECTION)
    .find()
    .toArray()) as Todo[];

  return JSON.parse(JSON.stringify(data));
};

export const getTodo = async (id: ObjectId | string): Promise<Todo> => {
  const db = await connectToDatabase();
  id = typeof id === "string" ? new ObjectId(id) : id;

  const todo = (await db
    .collection(MONGODB_COLLECTION)
    .findOne({ _id: id })) as Todo;

  return todo;
};

export const addTodo = async (todo: Todo): Promise<ObjectId> => {
  const db = await connectToDatabase();

  const response = await db.collection(MONGODB_COLLECTION).insertOne(todo);

  return response.insertedId;
};

export const deleteTodo = async (id: ObjectId | string) => {
  const db = await connectToDatabase();
  id = typeof id === "string" ? new ObjectId(id) : id;

  return await db.collection(MONGODB_COLLECTION).deleteOne({ _id: id });
};

export const editTodo = async (id: ObjectId | string, todo: Todo) => {
  const db = await connectToDatabase();
  id = typeof id === "string" ? new ObjectId(id) : id;

  return await db.collection(MONGODB_COLLECTION).replaceOne({ _id: id }, todo);
};
