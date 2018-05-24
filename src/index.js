import React from "react";
import ReactDOM from "react-dom";

import { AppContainer } from "react-hot-loader";
import { App } from "./app";

// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./app", () => {
    render(App);
  });
}
