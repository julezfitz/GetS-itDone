const LocalStrategy = require("passport");
const bcrypt = require("bcrypt");

module.exports = (db, passport) => {
	passport.use(
		new LocalStrategy((username, password, done) => {
			//Match user
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
              return done(null, false, { message: "Incorrect password" })
            }
					});
				}
			});
		})
	);
};
