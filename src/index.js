import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import "./index.css";
import App from "./App.js";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <App />
  </Router>
);