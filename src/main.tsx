import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import queryClient from "./configs/query-client.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
