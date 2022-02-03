const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const checkIfEmpty = require("../helpers/auth/checkIfEmpty");
const trimFields = require("../helpers/auth/trimFields");

// API documentation for Open API below

const loginErrors = {
	errors: [],
};
const registerErrors = {
	errors: [],
};

module.exports = db => {
	//User attempts to log in
	router.post("/user/session", (req, res, next) => {
		const { email, password } = req.body;

	
		if (!email || !password) {
			loginErrors.errors.push({ message: "Please fill out the fields." });
			res.send(loginErrors);
			return;
		}

		passport.authenticate("local", (err, user, info) => {
			if (err) throw err;
			
			//If passport does not find user, send error response
			if (!user) {
				loginErrors.errors.push({ message: info.message });
				res.send(loginErrors);
				return;
			} else {

				//Passport found a user
				req.logIn(user, err => {
					if (err) throw err;

					//Send successful auth status + message
					res.status(200).send("Successfully Authenticated");
				});
			}
		})(req, res, next);
	});

	//User attempts to register
	router.post("/user/register", (req, res) => {
		const hasEmptyField = checkIfEmpty(req.body);
		const {
			firstName,
			lastName,
			email,
			password,
			password2,
			city,
			province,
			postalCode,
			country,
			image,
		} = trimFields(req.body);

		const hashedPassword = bcrypt.hashSync(password, 12);

		//Check if any fields are empty
		if (hasEmptyField) {
			registerErrors.errors.push({
				message: "Please fill out all the fields.",
			});
			res.send(registerErrors);
			return;
		}

		//Check if email exists
		return db
			.query(
				`
				SELECT * FROM users
				WHERE email = $1
		`,
				[email]
			)
			.then(user => {
				if (user.rows.length) {
					registerErrors.errors.push({ message: "E-mail already exists" });
					res.send(registerErrors);
					return;
				}

				//If user does not exist, check to see if both password fields match
				if (password !== password2) {
					registerErrors.errors.push({ message: "Passwords do not match" });
					res.send(registerErrors);
					return;
				}

				//Pass - register user
				return db
					.query(
						`
						INSERT INTO users(first_name, last_name, email, password, city, province, postal_code, country, image)
      			VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      			RETURNING *
			`,
						[
							firstName,
							lastName,
							email,
							hashedPassword,
							city,
							province,
							postalCode,
							country,
							image,
						]
					)
					.then(success => {
						res.send({
							success: {
								user: success.rows[0],
							},
						});
					})
					.catch(err => {
						registerErrors.errors.push({
							message: "Server error. Please try again.",
						});
						console.log(err);
					});
			});
	});

	return router;
};

module.exports.apiDocs = {
	"/user/register": {
		post: {
			description: "Create a user account",
			tags: ["users"],
			requestBody: {
				description: "user model",
				content: {
					"application/json": {
						schema: {},
						example: {
							firstName: "Johnny",
							lastName: "Smith",
							email: "jsmith@email.com",
							password: "password",
							city: "Toronto",
							province: "Ontario",
							postalCode: "A5T3BF",
							country: "Canada",
							image: "https://images.unsplash.com/profile.svg",
						},
					},
				},
			},
			responses: {
				201: {
					description: "Session Created",
					content: {
						"application/json": {
							schema: {},
							example: {
								success: {
									user: {
										firstName: "Johnny",
										lastName: "Smith",
										email: "jsmith@email.com",
										password: "password",
										city: "Toronto",
										province: "Ontario",
										postalCode: "A5T3BF",
										country: "Canada",
										image: "https://images.unsplash.com/profile.svg",
									},
								},
							},
						},
					},
				},
				401: {
					description: "Unauthorized",
					content: {
						"application/json": {
							schema: {},
							example: {
								errors: [
									{
										message: "Fields cannot be empty",
									},
									{
										message: "Passwords do not match",
									},
								],
							},
						},
					},
				},
			},
		},
	},
	"/user/session": {
		post: {
			description: "Login to a user account",
			tags: ["users"],
			requestBody: {
				description: "user email and password",
				content: {
					"application/json": {
						schema: {},
						example: {
							email: "jsmith@email.com",
							password: "password",
						},
					},
				},
			},
			responses: {
				201: {
					description: "Session Created",
					content: {
						"application/json": {
							schema: {},
							example: {
								firstName: "Johnny",
								lastName: "Smith",
								email: "jsmith@email.com",
								password: "password",
								city: "Toronto",
								province: "Ontario",
								postalCode: "A5T3BF",
								country: "Canada",
								image: "https://images.unsplash.com/profile.svg",
							},
						},
					},
				},
				401: {
					description: "Unauthorized",
					content: {
						"application/json": {
							schema: {
								type: "array",
							},
							example: {
								errors: [
									{
										message: "Please fill out the fields.",
									},
								],
							},
						},
					},
				},
			},
		},
		delete: {
			description: "Logout of a user account",
			tags: ["users"],
			responses: {
				204: {
					description: "Session terminated",
				},
			},
		},
	},

	"/user/:userId": {
		get: {
			description: "Get a user details",
			tags: ["users"],
			parameters: {
				pathParam: {
					name: "userId",
					in: "path",
					description: "get user by id",
					required: true,
				},
			},
			200: {
				description: "An individual user's details.",
				content: {
					"application/json": {
						schema: {},
						example: {
							firstName: "Johnny",
							lastName: "Smith",
							email: "jsmith@email.com",
							password: "password",
							city: "Toronto",
							province: "Ontario",
							postalCode: "A5T3BF",
							country: "Canada",
							image: "https://images.unsplash.com/profile.svg",
							ratings: {
								totalRatings: 120,
								averageRating: 4.5,
							},
						},
					},
				},
			},
		},
		put: {
			description: "Update a user account",
			tags: ["users"],
			parameters: {
				pathParam: {
					name: "userId",
					in: "path",
					description: "update user by id",
					required: true,
				},
			},
			requestBody: {
				description: "user model",
				content: {
					"application/json": {
						schema: {},
						example: {
							firstName: "John",
							lastName: "Smith",
							email: "jsmi@email.com",
							password: "password1",
							city: "Toronto",
							province: "Ontario",
							postalCode: "B5T3BF",
							country: "Canada",
							image: "https://images.unsplash.com/profile.svg",
						},
					},
				},
			},
			responses: {
				200: {
					description: "User updated",
					content: {
						"application/json": {
							schema: {},
							example: {
								firstName: "Johnny",
								lastName: "Smith",
								email: "jsmith@email.com",
								password: "password",
								city: "Toronto",
								province: "Ontario",
								postalCode: "A5T3BF",
								country: "Canada",
								image: "https://images.unsplash.com/profile.svg",
							},
						},
					},
				},
			},
		},
	},
};
