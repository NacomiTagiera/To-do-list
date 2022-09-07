import DrawerAppBar from "./components/TopBar";
import { ToDoList } from "./pages/ToDoList";
import { AddTaskPanel } from "./pages/AddTaskPanel";
import PageNotFound from "./pages/PageNotFound";
import { HomePage } from "./pages/HomePage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <DrawerAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ToDoList />} />
        <Route path="/add" element={<AddTaskPanel />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
