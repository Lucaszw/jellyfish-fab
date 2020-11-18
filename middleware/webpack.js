const express = require("express");
const router = express.Router()

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require("../webpack.dev.js");

const compiler = webpack(config);
router.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
router.use(webpackHotMiddleware(compiler));


module.exports = router;