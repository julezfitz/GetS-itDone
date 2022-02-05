const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const passport = require("passport");
const app = express();

const db = require("./db");

module.exports = function application(ENV) {
	app.use(bodyparser.json());

	//Configure cors to allow for front end to access cookies
	app.use(
		cors({
			origin: ["http://localhost:3000", "http://localhost:3001"],
			methods: ["GET", "POST", "PUT", "DELETE"],
			credentials: true,
		})
	);

	app.use(
		"/api-docs",
		swaggerUi.serve,
		swaggerUi.setup(require("./openapi-spec"))
	);

	app.use("/", require("./routes/listings")(db));
	app.use("/", require("./routes/categories")(db));
	app.use("/", require("./routes/users")(db));
	app.use("/", require("./routes/ratings")(db));
	app.use("/", require("./routes/offers")(db));

	//Passport config
	require("./config/passport")(passport, db);
	app.use(passport.initialize());
	app.use(passport.session());

	app.close = function () {
		return db.end();
	};

	return app;
};
