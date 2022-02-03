const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const passport = require("passport");

const app = express();

const db = require("./db");

module.exports = function application(ENV) {
  app.use(bodyparser.json());
  app.use(cors());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require('./openapi-spec')));

  app.use("/", require("./routes/listings")(db))
  app.use("/", require("./routes/categories")(db))
  app.use("/", require("./routes/users")(db))
  require("./config/passport")(passport);

  app.close = function() {
    return db.end();
  };

  return app;
};
