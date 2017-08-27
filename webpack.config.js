var webpack = require("webpack");
var HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./demo.js",
  output: { path: __dirname + "/docs", filename: "bundle.js" },
  devtool: "source-map",
  devServer: { disableHostCheck: true },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  plugins: [new HTMLWebpackPlugin({ title: "react-table-drag-select demo" })]
};
