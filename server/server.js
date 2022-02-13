const Express = require("express");
const Passport = require("passport");
const cors = require("cors");
const App = Express();
const BodyParser = require("body-parser");
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
app.use(cors());
App.use(Express.static("public"));

//Passport config
require("./config/passport")(passport);
App.use(Passport.initialize());
App.use(Passport.session());

App.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(
		`Express seems to be listening on port ${PORT} so that's pretty good 👍`
	);
});
