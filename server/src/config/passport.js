const LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const bcrypt = require("bcryptjs");

module.exports = (passport, db) => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
			},
			(username, password, done) => {
				
				//First get user by email
				db.query(
					`
        	SELECT id, email, first_name, last_name, password, city, country, province
        	FROM users
        	WHERE email = $1;
      	`,
					[username]
				).then(res => {
					const user = res.rows;

					//If an email is found, compare passwords
					if (user.length > 0) {
						bcrypt.compare(password, user[0].password, (err, isMatch) => {
							if (err) throw err;

							if (isMatch) {
								return done(null, {
									id: user[0].id,
									email: user[0].email,
									firstName: user[0]["first_name"],
									lastName: user[0]["last_name"],
									city: user[0]["city"],
									country: user[0]["country"],
									province: user[0]["province"],
								});
							} else {
								return done(null, false, { message: "Incorrect password" });
							}
						});
					} else {
						return done(null, false, {
							message: "No account is registered with that e-mail address",
						});
					}
				});
			}
		)
	);

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:8001/user/google/callback",
				passReqToCallback: true,
			},
			function (req, accessToken, refreshToken, profile, done) {
				const { id, email } = profile;

				db.query(
					`
					SELECT * FROM	google_users
					WHERE id = $1
					AND email = $2
				`,
					[id.toString(), email]
				)
					.then(user => {
						console.log(user);
					})
					.catch(err => {
						console.log(err);
					});

				return done(null, profile);

				// User.findOrCreate({ googleId: profile.id }, function (err, user) {
				//   return done(err, user);
				// });
			}
		)
	);

	passport.serializeUser((user, done) => {
		console.log(user.id)
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		db.query(
			`SELECT id, email, password
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
