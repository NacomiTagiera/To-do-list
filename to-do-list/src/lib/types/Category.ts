import { z } from "zod";
import { TodoSchema } from "./Todo";

export const CategoryFormValuesSchema = z.object({
  name: z.string().min(3).max(60).trim().nonempty("ffff"),
  color: z.enum([
    "black",
    "blue",
    "gray",
    "green",
    "purple",
    "red",
    "white",
    "yellow",
  ]),
});

export type CategoryFormValues = z.infer<typeof CategoryFormValuesSchema>;

export const CategorySchema = CategoryFormValuesSchema.extend({
  tasks: z.array(TodoSchema),
});

export type Category = z.infer<typeof CategorySchema>;
