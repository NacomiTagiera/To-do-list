import { NextApiRequest, NextApiResponse } from "next";

import Todo from "./models/todo";
import { ITodo } from "@/types";

// Get all Todo items
export const getTodos = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todos: ITodo[] = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting Todos");
  }
};

// Add a new Todo item
export const addTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const newTodo: ITodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding Todo");
  }
};

// Update a Todo item
export const updateTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const updatedTodo: ITodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating Todo");
  }
};

// Delete a Todo item
export const deleteTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting Todo");
  }
};
