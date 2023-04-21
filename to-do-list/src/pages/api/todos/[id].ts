import { NextApiRequest, NextApiResponse } from "next";

import { deleteTodo, editTodo, getTodo } from "@/lib/controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id!;

  try {
    if (req.method === "GET") {
      const todo = await getTodo(id as string);

      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      return res.status(200).json({ todo });
    } else if (req.method === "DELETE") {
      const deletedCount = await deleteTodo(id as string);

      if (deletedCount === 0) {
        return res.status(404).json({ error: "Todo not found" });
      }

      return res.status(200).json({});
    } else if (req.method === "PATCH") {
      const { completed } = req.body;

      const success = await editTodo(id as string, { completed });

      if (!success) {
        return res.status(404).json({ error: "Todo not found" });
      }

      return res.status(200).json({});
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
