import { model, models, Schema } from "mongoose";

const TodoSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
