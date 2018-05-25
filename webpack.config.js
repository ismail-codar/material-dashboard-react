const path = require("path");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ROOT = path.resolve(__dirname, ".");
const getRoot = path.join.bind(path, ROOT);
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  context: __dirname,
  entry: {
    app: getRoot("./src/index")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist")
  },
  mode: "development",

  node: {
    fs: "empty",
    __dirname: false,
    __filename: false
  },

  resolve: {
    extensions: [
      ".ts",
      ".js",
      ".tsx",
      ".jsx",
      ".json",
      ".css",
      ".html",
      ".woff",
      ".woff2",
      ".ttf"
    ]
  },

  devtool: "source-map",

  module: {
    rules: [
      { test: /\.[tj]sx?$/, use: ["babel-loader"] },
      {
        test: /\.(ttf2?|eot|svg|png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
    // new CopyPlugin([{ from: "src/app/app.html", to: "" }]),
    new CleanWebpackPlugin("dist", { root: getRoot() }),
    // new BundleAnalyzerPlugin({
    //   // Can be `server`, `static` or `disabled`.
    //   // In `server` mode analyzer will activate HTTP server to show bundle report.
    //   // In `static` mode single HTML file with bundle report will be generated.
    //   // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
    //   analyzerMode: "static",
    //   reportFilename: "report.html",
    //   openAnalyzer: true,
    //   logLevel: "info"
    // })
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    })
  ],
  devServer: {
    port: 3040,
    open: true,
    historyApiFallback: {
      index: "/public/"
    },
    watchOptions: {
      ignored: /node_modules/
    }
  }
};
