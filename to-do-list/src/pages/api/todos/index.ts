import { NextApiRequest, NextApiResponse } from "next";
import { addTodo, getTodos } from "@/database/controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getTodos(req, res);
      break;
    case "POST":
      await addTodo(req, res);
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
