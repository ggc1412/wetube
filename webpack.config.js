const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE_JS = path.resolve(__dirname, "assets", "js", "main.js");
const ENTRY_FILE_CSS = path.resolve(__dirname, "assets", "scss", "styles.scss");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE_JS, ENTRY_FILE_CSS],
  mode: MODE,
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new MiniCssExtractPlugin({ filename: "style.css" })],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "assets/js")],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // translate CSS into CommonJS
          "postcss-loader", //Parse CSS and add vendor prefixes
          "sass-loader" // comfiles Sass to CSS, using Node Sass by default
        ],
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
