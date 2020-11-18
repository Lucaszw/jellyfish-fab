const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require("./webpack.config.js");

if (process.env.NODE_ENV != "production") dotenv.config();

const app = express();
const port = process.env.PORT || 8011;

app.use("/assets", express.static(path.resolve() + "/assets"));
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV == "production") {
  app.use("/", express.static(path.resolve() + "/dist"));
} else {
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));

}

app.get("/api/*", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
