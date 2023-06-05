import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import connect from "./connection";
import {
  Collection,
  CollectionFormValues,
  Todo,
  TodoFormValues,
} from "@/types";

export const getCollections = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const db = await connect();

    const data = await db.find().toArray();
    const collections: Collection[] = JSON.parse(JSON.stringify(data));

    res.status(200).json({ collections });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createCollection = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { name } = req.body;
    const collection: Collection = {
      name,
      todos: [],
    };

    const db = await connect();
    const response = await db.insertOne(collection);

    const insertedId = response.insertedId;
    res.status(200).json(insertedId);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCollection = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const id = req.query.id as string;

    const db = await connect();
    const result = await db.deleteOne({ _id: new ObjectId(id) });
    const deletedCount = result.deletedCount;

    if (deletedCount === 0) {
      res.status(404).json({ error: "Collection not found" });
    } else {
      res.status(200).json({ success: "Collection deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addTodo = async (req: NextApiRequest, res: NextApiResponse) => {};

const deleteTodo = async (req: NextApiRequest, res: NextApiResponse) => {};
