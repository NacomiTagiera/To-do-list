import * as yup from "yup";
import { Collection, Todo } from "@/types";

export const collectionSchema = yup.object().shape({
  name: yup
    .string()
    .label("Collection")
    .required()
    .trim("Delete leading and trailing spaces")
    .strict(true)
    .min(2)
    .max(32)
    .test("unique", "Collection's name must be unique", function (value) {
      const collections: Collection[] = this.parent || [];
      const isUnique = collections.every(
        (collection) => collection.name !== value
      );
      return isUnique;
    }),
});

export const todoSchema = yup.object().shape({
  deadline: yup.string().label("Deadline").required(),
  title: yup
    .string()
    .label("Task")
    .required()
    .trim("")
    .strict(true)
    .min(2)
    .max(50)
    .test("unique", "Collection's name must be unique", function (value) {
      const tasks: Todo[] = this.parent || [];
      const isUnique = tasks.every((task) => task.title !== value);
      return isUnique;
    }),
});
