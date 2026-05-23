// This must be run inside the folder $FOLDER_GAME_TROTTING8_LAZY_PATH;
// cd $FOLDER_GAME_TROTTING8_LAZY_PATH; webpack-dev-server --config webpack/config.dev.js --host 0.0.0.0 --port 8090 --progress
const path = require('path'),
  webpack = require('webpack'),
  rootPackage = require('../../../package'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

const GAME_ID = process.env.game_id,
  gameIdUpperCase = GAME_ID.toUpperCase();

const mode = 'development';
const mainScript = `v-viewer-${GAME_ID}.min`;

const devServerStaticDirectory = path.join(path.join(__dirname, '../tmp/'), 'public_local'),
  outputPath = path.resolve(path.join(__dirname, '../'), 'public_local');

console.log("devServerStaticDirectory", devServerStaticDirectory);
console.log("outputPath", outputPath);
module.exports = {
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'tmp/public_local/index.html',
      version: rootPackage['version'],
      apiEndpoint: process.env[`V_VIEWER_${gameIdUpperCase}_API_ENDPOINT`],
      mainScript: mainScript
    }),
    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(rootPackage['version'])
    }),
  ],
  mode: 'development',
  devtool: false, //'inline-source-map',
  entry: './tmp/src/index.js',
  resolve: {
    extensions: ['.tsx', 'ts', '.js', '.jsx'],
    alias: {
      // sinon: 'sinon/pkg/sinon',
      '@v-viewer/core': path.resolve(path.join(__dirname, '../../'), 'core/src'),
      '@v-viewer/race-common': path.resolve(path.join(__dirname, '../../'), 'race-common/src'),
    }
  },
  // >>>  disabled March 31 to debug // cache: {
  // >>>  disabled March 31 to debug //     type: 'filesystem'
  // >>>  disabled March 31 to debug // },
  bail: false,
  output: {
    path: outputPath,
    filename: `v-viewer-${GAME_ID}.min`,
    publicPath: '/',
    pathinfo: false,
  },
  watchOptions: {
    ignored: ['**/node_modules']
  },
  devServer: {
    // >>>  disabled March 31 to debug // https: true,
    allowedHosts: 'all',
    devMiddleware: {
      publicPath: '/',
    },
    static: {
      directory: devServerStaticDirectory,
      serveIndex: false
    }
  },
  module: {
    rules: [{
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }, ],
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
            loader: 'css-loader',
            options: {
              // modules: true,
              importLoaders: 2,
            }
          },
          //   MediaQueryPlugin.loader,
          "sass-loader"
        ].filter(Boolean),
      }
    ]
  },

};