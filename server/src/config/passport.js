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
				const { id, given_name, family_name, email, picture } = profile;

				db.query(
					`
					SELECT * FROM google_users
					WHERE id = $1
					AND email = $2 
				`,
					[id.slice(0, 7), email]
				)
					.then(res => {
						if (!res.rows[0]) {
							db.query(
								`INSERT INTO google_users(id, first_name, last_name, email, city, province, postal_code, country, image)
								VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
								RETURNING *
					`,
								[
									id.slice(0, 7),
									given_name,
									family_name,
									email,
									"Montreal",
									"Quebec",
									"H3R2R2",
									"Canada",
									picture,
								]
							)
								.then(response => {
									req.session["user"] = {
										id: response.rows[0].id,
										email: response.rows[0].email,
										firstName: response.rows[0]["first_name"],
										lastName: response.rows[0]["last_name"],
										city: response.rows[0]["city"],
										country: response.rows[0]["country"],
										province: response.rows[0]["province"],
										image: response.rows[0]["image"],
									};
								})
								.catch(err => console.log(err));
						} else {
						}
					})
					.catch(err => console.log("err", err));

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
