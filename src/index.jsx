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
root.render(<App />);



// import React from "react";
// // import ReactDOM from "react-dom";
// import App from "./App";
// import { createRoot } from 'react-dom/client';

// // ReactDOM.render(<App />, document.getElementById("root"));

// function AppWithCallbackAfterRender() {
//     useEffect(() => {
//         console.log('rendered');
//     });

//     return <App />
// }

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<AppWithCallbackAfterRender />);