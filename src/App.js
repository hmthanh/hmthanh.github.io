import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
// import Main from "./pages/MainPage";
import "./App.css";
import "./global.css";
import { ArrowAltCircleUp } from "./components/Icon/Icon";
import MobileNav from "./components/MobileNav";
const Main = React.lazy(() => import("./pages/MainPage"));
class App extends Component {
  render() {
    return (
      <>
        <MobileNav></MobileNav>
        <div></div>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
        <a className="btn-scroll-top" href="index.html#">
          <ArrowAltCircleUp />
        </a>
      </>
    );
  }
}

export default App;
