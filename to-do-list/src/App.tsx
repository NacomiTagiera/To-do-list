import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AddTaskForm } from "./form/AddTaskForm";
import TopBar from "./components/TopBar";
import ToDoList from "./list/ToDoList";
import PageNotFound from "./pageNotFound/PageNotFound";

function App() {
  return <AddTaskForm />;
}

export default App;
