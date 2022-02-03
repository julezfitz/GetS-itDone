const LocalStrategy = require("passport");
const bcrypt = require("bcrypt");

module.exports = (db, passport) => {
	passport.use(
		new LocalStrategy((username, password, done) => {
			db.query(
				`
        SELECT id, username, password
        FROM users
        WHERE username = $1
        AND password = #2
      `,
				[username, password]
			);
		})
	);
};
