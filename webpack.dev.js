const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function allNodeModulesExcept (exceptions) {
  var _e = exceptions.join('|')
  return new RegExp('node_modules/(?!(' + _e + ')/).*')
}

module.exports = {
  entry: {
    main: "./src", 
    middleware: "webpack-hot-middleware/client?reload=true",
    "pdf.worker": "pdfjs-dist/build/pdf.worker.entry"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
              config: {
                path: "postcss.config.js",
              },
            },
          },
          {
            loader: "fast-sass-loader",
            options: { sourceMap: false },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: allNodeModulesExcept([]),
        use: [{loader: "babel-loader", options: {cacheDirectory: true}}]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|stl|gltf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(svg|html)?$/,
        use: "html-loader",
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /pdf\.worker(\.min)?\.js$/,
        loader: 'file-loader'
      }
    ],
  },
  devtool: "eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  }
};