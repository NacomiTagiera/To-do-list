import { Schema, model, models } from "mongoose";
import { ITodo } from "@/types";

const todoSchema = new Schema<ITodo>({
  _id: { type: String, required: true },
  category: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deadline: { type: Date, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
});

const Todo = models.todo || model<ITodo>("todo", todoSchema);

export default Todo;
