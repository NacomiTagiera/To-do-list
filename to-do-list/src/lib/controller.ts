import { ObjectId } from "mongodb";

import connectToDatabase from "./connection";
import { Todo, TodoFormikValues } from "@/types";

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

export const deleteTodo = async (id: ObjectId | string): Promise<number> => {
  const db = await connectToDatabase();
  id = typeof id === "string" ? new ObjectId(id) : id;

  return (await db.collection(MONGODB_COLLECTION).deleteOne({ _id: id }))
    .deletedCount;
};

export const editTodo = async (
  id: ObjectId | string,
  updatedTodo: TodoFormikValues | { completed: boolean }
) => {
  const db = await connectToDatabase();
  id = typeof id === "string" ? new ObjectId(id) : id;

  const updateQuery =
    "completed" in updatedTodo
      ? { $set: { completed: updatedTodo.completed } }
      : {
          $set: {
            category: updatedTodo.category,
            deadline: updatedTodo.deadline,
            description: updatedTodo.description,
            title: updatedTodo.title,
          },
        };

  return await db
    .collection(MONGODB_COLLECTION)
    .updateOne({ _id: id }, updateQuery);
};
