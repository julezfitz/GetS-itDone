const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");

const app = express();

const db = require("./db");

module.exports = function application(ENV) {
  app.use(bodyparser.json());

  app.use(require("./routes/listings")(db))

  app.close = function() {
    return db.end();
  };

  return app;
};