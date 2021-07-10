/*
 * @Author: mrzou
 * @Date: 2021-07-10 19:33:00
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-10 20:11:30
 * @Description: file content
 */
import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage";
import ExamplePage from "./routes/ExamplePage";
import UserPage from "./routes/UserPage";
import { UserPageDynamic } from "./dynamic";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/example" component={ExamplePage} />
        {/* <Route path="/user" component={UserPage} /> */}
        <Route path="/user" component={UserPageDynamic} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
