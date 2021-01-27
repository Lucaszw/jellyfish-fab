const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
if (process.env.NODE_ENV != "production") dotenv.config();

const app = express();
const port = process.env.PORT || 8011;

app.use("/assets", express.static(path.resolve() + "/assets"));

if (process.env.NODE_ENV == "production") {
  app.use("/", express.static(path.resolve() + "/dist"));
} else {
  app.use("/", require("./middleware/webpack.js"));
}

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
