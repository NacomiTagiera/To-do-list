import { NextApiRequest, NextApiResponse } from "next";

import Todo from "@/database/models/todo";
import { ResponseFuncs } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const catcher = (error: Error) => res.status(400).json({ error });

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res.json(await Todo.find({}).catch(catcher));
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res.json(await Todo.create(req.body).catch(catcher));
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
}
