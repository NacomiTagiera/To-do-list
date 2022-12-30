import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import queryClient from "./config/queryClient";
import { QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
