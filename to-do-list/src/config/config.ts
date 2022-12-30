interface BaseURL {
  url: string;
}

interface Todos {
  url: string;
}

interface Connection {
  baseURL: BaseURL;
  todos: Todos;
}

const BASE_URL =
  "https://todo-list-881e2-default-rtdb.europe-west1.firebasedatabase.app/";
const URL_GET_TODOS = "todos.json";

export const connection: Connection = {
  baseURL: {
    url: BASE_URL,
  },
  todos: {
    url: BASE_URL + URL_GET_TODOS,
  },
};
