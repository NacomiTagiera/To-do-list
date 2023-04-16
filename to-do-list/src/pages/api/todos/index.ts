import { NextApiRequest, NextApiResponse } from "next";

import { addTodo, getTodos } from "@/lib/controller";
import { Todo } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await getTodos();
    res.status(200).json({ todos: data });
  } else if (req.method === "POST") {
    const { category, deadline, description, title } = req.body;
    const todo: Todo = {
      category,
      completed: false,
      deadline,
      description,
      title,
    };

    const insertedId = await addTodo(todo);
    res.revalidate("/todos");
    res.revalidate("/todos" + insertedId);
    res.status(200).json(insertedId);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
