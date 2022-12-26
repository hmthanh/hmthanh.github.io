import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./style/style.css";
import "./style/theme-color.css";
import "./style/custom.css";
import "./style/owl.theme.css";
import "./style/owl.carousel.css";
import "./style/jquery.bxslider.css";
import "./style/jquery.fancybox.css";
// import "./style/jquery.mCustomScrollbar.min.css";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
