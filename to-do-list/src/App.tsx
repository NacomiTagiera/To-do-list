import { Provider } from "react-redux";
import { store } from "./app/store";
import DrawerAppBar from "./components/TopBar";
import { ToDoList } from "./list/ToDoList";

function App() {
  return (
    <Provider store={store}>
      <DrawerAppBar />
      <ToDoList />
    </Provider>
  );
}

export default App;
