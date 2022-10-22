import React, { Component, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const InfoPage = lazy(() => import("./InfoPage/InfoPage"));

class MainPage extends Component {
  render() {
    return (
      <main className="main">
        <Suspense fallback={<div>Đã có lỗi xảy ra vui lòng kiểm tra lại</div>}>
          <Switch>
            <Route exact path="/">
              <InfoPage></InfoPage>
            </Route>
          </Switch>
        </Suspense>
      </main>
    );
  }
}

export default MainPage;
