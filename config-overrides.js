const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env);

  config.module.rules.push({ test: /\.tsx?$/, loader: "ts-loader" });

  return config;
};
