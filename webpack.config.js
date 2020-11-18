const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: [
    './src',
    'webpack-hot-middleware/client?reload=true'
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {loader:"style-loader"}, 
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|stl|gltf)$/,
        use: [{
          loader: 'file-loader', 
          options: {
            name: '[path][name].[ext]'
          }
        }]
      },
      {
        test: /\.(svg|html)?$/,
        use: 'html-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  devtool: '#inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'assets'),
    contentBasePublicPath: '/assets',
    disableHostCheck: true,
    hot: false,
    hotOnly: false,
    liveReload: true
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};