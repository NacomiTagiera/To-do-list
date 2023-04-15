import { NextApiRequest, NextApiResponse } from "next";

import Todo from "@/database/models/Todo";
import { ResponseFuncs } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as keyof ResponseFuncs;

  const catcher = (error: Error) => res.status(400).json({ error });

  const { id } = req.query;

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res.json(await Todo.findById(id).catch(catcher));
    },
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      res.json(
        await Todo.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
      );
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      res.json(await Todo.findByIdAndRemove(id).catch(catcher));
    },
  };

  const response = handleCase[method];
  if (response) {
    response(req, res);
  } else {
    res.status(400).json({ error: "No Response for This Request" });
  }
}
