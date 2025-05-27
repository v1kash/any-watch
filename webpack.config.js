const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  target: "web",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: 'images/[name][ext]', // For images
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
     {
      test: /\.(tsx|ts|js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", 
             ["@babel/preset-react", {
              "runtime": "automatic"}],
              "@babel/preset-typescript"],
        },
      },
     },
     {
      test: /\.css$/,
      use: ["style-loader", "css-loader"], // here order is importatnt, it runs from right to left so css-loader first and then style-loader
     },
     {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      type: 'asset/resource',
     },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    open: true,
    hot: true,
  },
  resolve: {
     extensions: ['.tsx', '.ts', '.js', '.jsx'],            // Allow importing these file types without specifying the extension
  },
};
