import React from "react";

import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "./assets/css/material-dashboard-react.css?v=1.2.0";

import indexRoutes from "./routes/index.jsx";

const hist = createBrowserHistory();

export const App = () => (
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>
);
