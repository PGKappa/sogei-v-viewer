const path = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  TerserPlugin = require("terser-webpack-plugin"),
  rootPackage = require("../../../package");

const GAME_ID = process.env.game_id,
  gameIdUpperCase = GAME_ID.toUpperCase();
const PAL_START = process.env.V_VIEWER_PAL_START;
const PAL_END = process.env.V_VIEWER_PAL_END;

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: "../index.html",
      title: process.env[`V_VIEWER_${gameIdUpperCase}_INDEX_TITLE`],
      apiEndpoint: process.env[`V_VIEWER_${gameIdUpperCase}_API_ENDPOINT`],
      template: "dist_template/partners/default/index.html",
      vars: process.env[`V_VIEWER_${gameIdUpperCase}_VARS`] || "",
      version: rootPackage["version"],
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(rootPackage["version"]),
    }),
  ],
  mode: "production",
  devtool: false,
  entry: ["./src/index.js"],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@v-viewer/core": path.resolve(
        path.join(__dirname, "../../"),
        "core/src"
      ),
      "@v-viewer/fake-api": path.resolve(
        path.join(__dirname, "../../"),
        "fake-api"
      ),
    },
  },
  bail: true,
  output: {
    path: path.resolve("dist", "lib"),
    filename: process.env[`V_VIEWER_${gameIdUpperCase}_JS_ENTRYPOINT`],
    publicPath: "lib",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
            unsafe_math: true,
            keep_fargs: false,
            typeofs: false,
            dead_code: false,
          },
        },
      }),
    ],
    mangleWasmImports: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    concatenateModules: true,
    sideEffects: false,
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
    ],
  },
};
