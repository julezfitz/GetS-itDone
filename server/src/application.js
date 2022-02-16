const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const app = express();
const OpenApiValidator = require("express-openapi-validator");
const cookieSession = require("cookie-session");
const db = require("./db");
const passport = require("passport");

module.exports = function application(ENV) {
	app.use(bodyparser.json());

	//Configure cors to allow for front end to access cookies

	app.use(
		cors({
			origin: [
				"http://localhost:3000",
				"http://localhost:3001",
				"http://localhost:3002",
				"http://localhost:3003",
				"http://localhost:3004",
			],
			credentials: true,
		})
	);

	app.use(cookieParser("userSession"));

	app.use(
		cookieSession({
			name: "userSession",
			keys: ["hello", "world"],
			maxAge: 24 * 60 * 60 * 1000,
		})
	);

	app.use(
		"/api-docs",
		swaggerUi.serve,
		swaggerUi.setup(require("./openapi-spec"))
	);

	// openapi validation middleware
	// app.use(
	// 	OpenApiValidator.middleware({
	// 		apiSpec: require("./openapi-spec"),
	// 		validateRequests: true, // (default)
	// 		validateResponses: false, // false by default
	// 		validateApiSpec: false,
	// 	})
	// );

	app.use("/", require("./routes/listings")(db));
	app.use("/", require("./routes/categories")(db));
	app.use("/", require("./routes/users")(db));
	app.use("/", require("./routes/ratings")(db));
	app.use("/", require("./routes/offers")(db));
	app.use("/", require("./routes/notifications")(db));

	

	//openapi validation middleware
	app.use((err, req, res, next) => {
		// format error
		res.status(err.status || 500).json({
			message: err.message,
			errors: err.errors,
		});
	});

		//Passport config
		require("./config/passport")(passport, db);
		app.use(passport.initialize());
		app.use(passport.session());
	

	app.close = function () {
		return db.end();
	};

	return app;
};
