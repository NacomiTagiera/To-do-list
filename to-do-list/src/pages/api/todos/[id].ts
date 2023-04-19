import { NextApiRequest, NextApiResponse } from "next";

import { deleteTodo, editTodo, getTodo } from "@/lib/controller";
import { Todo } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id!;
  const { method } = req;

  if (method === "GET") {
    const todo = await getTodo(id as string);

    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ todo });
  } else if (method === "DELETE") {
    const data = await deleteTodo(id as string);

    res.status(200).json({ deletedCount: data.deletedCount });
  } else if (method === "PATCH") {
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
