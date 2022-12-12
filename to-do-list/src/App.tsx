import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Typography } from "@mui/material";

import Navbar from "./components/Navbar";

const AddTaskPanel = lazy(() => import("./pages/AddTaskPanel"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ToDoList = lazy(() => import("./pages/ToDoList"));

function App() {
  return (
    <Suspense
      fallback={
        <Typography variant="h1" component="h1" textAlign="center">
          Loading...
        </Typography>
      }
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="list" element={<ToDoList />} />
        <Route path="add" element={<AddTaskPanel />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
