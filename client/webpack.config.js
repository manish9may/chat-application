const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js", // Your main entry point
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    proxy: [
      {
        context: ["/socket.io"],
        target: "http://localhost:5173",
        ws: true, // Enable WebSocket proxying
      },
    ],
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|mp4)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Path to your template
      filename: path.resolve(__dirname, "dist/index.html"), // Output path for HTML
    }),
    new Dotenv(),
  ],
};
