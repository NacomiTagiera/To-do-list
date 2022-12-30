import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//layout
import RootLayout from "./layouts/RootLayout";

//pages
const AddTaskPanel = lazy(() => import("./pages/AddTaskPanel"));
const Loading = lazy(() => import("./pages/Loading"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ToDoList = lazy(() => import("./pages/ToDoList"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<ToDoList />} />
      <Route path="add-task" element={<AddTaskPanel />} />
      <Route path="todo-list" element={<ToDoList />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
