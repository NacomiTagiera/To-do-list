import TodoList from "@/components/Todo/TodoList";
import { Todo } from "@/types";
import { getTodos } from "@/database/controller";

interface Props {
  todos: Todo[];
}

export default function Home({ todos }: Props) {
  return <TodoList todos={todos}></TodoList>;
}

export async function getStaticProps() {
  const todos = await getTodos();

  return {
    props: { todos },
    revalidate: 60,
  };
}
