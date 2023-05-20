import { NextApiRequest, NextApiResponse } from "next";
import { deleteTodo, editTodo, getTodo } from "@/database/controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getTodo(req, res);
      break;
    case "DELETE":
      await deleteTodo(req, res);
      break;
    case "PATCH":
      await editTodo(req, res);
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
