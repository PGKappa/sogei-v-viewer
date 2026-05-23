const path = require("path"),
  webpack = require("webpack"),
  rootPackage = require("../../../package"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  TerserPlugin = require("terser-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

const GAME_ID = process.env.game_id,
  gameIdUpperCase = GAME_ID.toUpperCase();

const mode = "development";

const mainScript = `v-viewer-${GAME_ID}.min`;
module.exports = {
  performance: {
    maxEntrypointSize: 500000000,
    maxAssetSize: 500000000,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "public_local/index.html",
      version: rootPackage["version"],
      apiEndpoint: process.env[`V_VIEWER_${gameIdUpperCase}_API_ENDPOINT`],
      vars: process.env[`V_VIEWER_${gameIdUpperCase}_VARS`] || "",
      mainScript: mainScript,
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(rootPackage["version"]),
    }),
  ],
  // mode: 'development',
  mode: "production",
  devtool: false, //'inline-source-map',
  entry: "./src/index.js",
  resolve: {
    extensions: [".tsx", "ts", ".js", ".jsx"],
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
  // >>>  disabled March 31 to debug // cache: {
  // >>>  disabled March 31 to debug //     type: 'filesystem'
  // >>>  disabled March 31 to debug // },
  bail: true,
  output: {
    path: path.resolve(path.join(__dirname, "../"), "public_local"),
    filename: mainScript,
    publicPath: "/",
    pathinfo: false,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // >> sourceMap: false,
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
  watchOptions: {
    ignored: ["**/node_modules"],
  },
  devServer: {
    // >>>  disabled March 31 to debug // https: true,
    allowedHosts: "all",
    devMiddleware: {
      publicPath: "/",
    },
    static: {
      directory: path.join(path.join(__dirname, "../"), "public_local"),
      serveIndex: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      // {
      //     test: /\.m?jsx?$/,
      //     exclude: /(node_modules|bower_components)/,
      //     use: {
      //         loader: 'babel-loader',
      //         options: {
      //             presets: ['@babel/preset-env', '@babel/preset-react']
      //         }
      //     }
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // modules: true,
              importLoaders: 2,
            },
          },
          //   MediaQueryPlugin.loader,
          "sass-loader",
        ].filter(Boolean),
      },
    ],
  },
};
