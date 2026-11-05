import * as React from "react";
import { createRoot } from "react-dom/client";
import { App, ErrorBoundary } from "./App.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary
    label="This page"
    message="Something on this page failed to load."
  >
    <App />
  </ErrorBoundary>,
);
