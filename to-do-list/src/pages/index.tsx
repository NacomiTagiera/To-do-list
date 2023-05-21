import TodoList from "@/components/Todo/TodoList";
import { Todo } from "@/types";
import { fetchListOFTodos } from "@/lib/fetch-api";

interface Props {
  todos: Todo[];
}

export default function Home({ todos }: Props) {
  return <TodoList todos={todos} />;
}

export async function getStaticProps() {
  const todos = await fetchListOFTodos();

  return {
    props: { todos },
    revalidate: 60,
  };
}
