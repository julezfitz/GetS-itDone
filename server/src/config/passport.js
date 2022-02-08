const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

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
        	SELECT id, email, first_name, last_name, password, city
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
