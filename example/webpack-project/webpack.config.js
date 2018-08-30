const path = require("path");
const webpack = require("webpack");
const package = require("./../../package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const defines = {
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  "process.env.VERSION": JSON.stringify(package.version)
};

const config = {
  target: "web",
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: process.env.NODE_ENV === "development" ? "eval-source-map" : false,
  plugins: [
    new webpack.DefinePlugin(defines),
    new HtmlWebpackPlugin({
      title: package.name + " (version " + package.version + ")",
      template: "./src/index.html"
    })
  ]
};

module.exports = config;
