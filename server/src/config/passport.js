const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = (passport, db) => {
	passport.use(
		new LocalStrategy((username, password, done) => {
			//First match user by email
			db.query(
				`
        SELECT id, username, password
        FROM users
        WHERE username = $1
        AND password = $2
      `,
				[username, password]
			).then(res => {
				if (res.rows.length > 0) {
					const user = res.rows[0];
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;
						if (isMatch) {
							return done(null, { id: user.id, email: user.email });
						} else {
							return done(null, false, { message: "Incorrect password" });
						}
					});
				}
			});
		})
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
