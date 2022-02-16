
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const bcrypt = require("bcryptjs");

module.exports = (passport, db) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:8001/user/google/callback",
				passReqToCallback: true,
			},
			function (req, accessToken, refreshToken, profile, done) {
				console.log("hi");
				return done(null, profile);

				// User.findOrCreate({ googleId: profile.id }, function (err, user) {
				//   return done(err, user);
				// });
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, cb) => {
		db.query(
			`SELECT id, username, password
			FROM users
			WHERE id = $1`,
			[id],
			(err, results) => {
				if (err) {
					return done(err);
				}

				return done(null, results.rows[0]);
			}
		);
	});
};
