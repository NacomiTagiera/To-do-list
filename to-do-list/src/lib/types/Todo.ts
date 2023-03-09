import { z } from "zod";

export const TodoFormValuesSchema = z.object({
  task: z
    .string({ required_error: "Please select a date and time" })
    .trim()
    .min(3)
    .max(100)
    .nonempty(),
  priority: z.enum(["Nice-to-have", "Minor", "Normal", "Major", "Critical"]),
});

export type TodoFormValues = z.infer<typeof TodoFormValuesSchema>;

export const TodoSchema = TodoFormValuesSchema.extend({
  _id: z.string(),
  creationDate: z.date(),
  isCompleted: z.boolean(),
});

export type Todo = z.infer<typeof TodoSchema>;
