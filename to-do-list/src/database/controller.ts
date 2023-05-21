import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import connectToDatabase from "./connection";
import { Todo } from "@/types";

export const getTodos = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await connectToDatabase();

    const data = await db.find().toArray();
    const todos = JSON.parse(JSON.stringify(data));

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;

    const db = await connectToDatabase();
    const todo = await db.findOne({ _id: new ObjectId(id) });

    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(200).json({ todo });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { category, deadline, description, title } = req.body;
    const todo: Todo = {
      category,
      completed: false,
      deadline,
      description,
      title,
    };

    const db = await connectToDatabase();
    const response = await db.insertOne(todo);

    const insertedId = response.insertedId;
    res.status(200).json(insertedId);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;

    const db = await connectToDatabase();
    const result = await db.deleteOne({ _id: new ObjectId(id) });
    const deletedCount = result.deletedCount;

    if (deletedCount === 0) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(200).json({ success: "Todo deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const { completed } = req.body;

    const db = await connectToDatabase();
    const updateQuery = { $set: { completed } };
    const result = await db.updateOne({ _id: new ObjectId(id) }, updateQuery);

    if (result.modifiedCount === 0) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(200).json({ success: "Todo updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
