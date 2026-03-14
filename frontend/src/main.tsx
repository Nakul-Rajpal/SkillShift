/**
 * @file main.tsx
 * @project SkillShift
 * @author Nakul Rajpal
 * @created 2026-03-14
 * @description Application entry point. Mounts the React root onto the DOM
 *              and wraps the App component in StrictMode for development checks.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
