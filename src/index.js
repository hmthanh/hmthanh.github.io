import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./style/style.css";
import "./style/theme-color.css";
import "./style/custom.css";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
