const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const checkIfEmpty = require("../helpers/auth/checkIfEmpty");
const trimFields = require("../helpers/auth/trimFields");

const registerErrors = {
	errors: [],
};

module.exports = db => {
	//User attempts to log in
	router.post("/user/session", (req, res, next) => {
		const { email, password } = req.body;
		const authResponse = {
			authentication: {
				isAuthenticated: false,
				user: null,
				errors: [],
			},
		};
		let errors = authResponse.authentication.errors;

		//If any field is empty, send error right away
		if (!email || !password) {
			errors.push({ message: "Please fill out the fields." });
			res.send(authResponse);
			return;
		}

		//If both fields are filled out, begin passport auth
		passport.authenticate("local", (err, user, info) => {
			if (err) throw err;

			//If passport does not find user, send error response
			if (!user) {
				errors.push({ message: info.message });
				res.send(authResponse);
				return;
			} else {
				//Passport found a user

				req.logIn(user, err => {
					if (err) throw err;
					//Send successful auth status + clear errors
					authResponse.authentication.isAuthenticated = true;
					authResponse.authentication.errors = [];
					authResponse.authentication.user = user;
					req.session["user"] = user;
					res.send(authResponse);
					return;
				});
			}
		})(req, res, next);
	});

	//User attempts to log out
	router.post("/user/logout", (req, res) => {
		const response = {
			authentication: {
				isLoggedOut: true
			}
		}
		req.session = null;
		res.status(200).send(response);
	});

	//Check to see if a user is logged in
	router.get("/user/session", (req, res) => {
		const authResponse = { isAuthenticated: false, user: null };
		if (!req.session.user) {
			res.send(authResponse);
			return;
		}

		authResponse.isAuthenticated = true;
		authResponse.user = req.session.user;
		res.send(authResponse);
		return;
	});

	//User attempts to register
	router.post("/user/register", (req, res) => {
		const hasEmptyField = checkIfEmpty(req.body);
		const {
			firstName,
			lastName,
			email,
			password,
			passwordConfirmation,
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
				//If email is returned from db, send error message
				if (user.rows.length) {
					registerErrors.errors.push({ message: "E-mail already exists" });
					res.send(registerErrors);
					return;
				}

				//If user does not exist, check to see if password + passwordConfirmation match
				if (password !== passwordConfirmation) {
					registerErrors.errors.push({ message: "Passwords do not match" });
					res.send(registerErrors);
					return;
				}

				//Success - register user
				return db
					.query(
						`INSERT INTO users(first_name, last_name, email, password, city, province, postal_code, country, image)
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
						//If user has successfully been registered in db, send success msg to front end
						req.session["user"] = {
							id: success.rows[0].id,
							email: success.rows[0].email,
						};

						res.send({
							success: {
								user: success.rows[0],
							},
						});
					})
					.catch(err => {
						//Catch any possible server/db errors and send response
						registerErrors.errors.push({
							message: "Server error. Please try again.",
						});
						console.log(err);
						res.send(registerErrors);
					});
			});
	});

	router.get("/user/:userId", (req, res) => {
		const { userId } = req.params;

		db.query(
			`
			SELECT * FROM users
			WHERE users.id = $1
		`,
			[userId]
		).then(user => {
			if (!user.rows.length) {
				res.status(404).send("User not found");
				return;
			}
			db.query(
				`
				SELECT COUNT(ratee_id) AS totalratings,
				ROUND(AVG(rating)) AS averagerating
				FROM user_ratings
				WHERE ratee_id = $1;
			`,
				[userId]
			).then(ratingInfo => {
				user.rows[0]["ratings"] = ratingInfo.rows[0];
				res.send({ user: user.rows[0] });
			});
		});
	});

	//Update user by Id
	router.put("/user/:userId", (req, res) => {
		const { userId } = req.params;
		const {
			firstName,
			lastName,
			email,
			password,
			city,
			province,
			postalCode,
			country,
			image,
		} = req.body;

		let queryString = [];
		const queryParams = Object.values(req.body);

		Object.keys(req.body).forEach((key, i) => {
			key = key.replace(/([A-Z])/g, "_$1").toLowerCase();
			queryString.push(`${key} = $${(i += 1)}`);
		});

		queryString =
			"UPDATE users SET " +
			queryString.join(", ") +
			` WHERE id = ${userId} RETURNING *;`;
		console.log(queryString);

		db.query(queryString, queryParams).then(user => {
			if (!user.rows.length) {
				res.status(404).send("User does not exist");
				return;
			}

			const updatedUser = user.rows[0];
			res.send({
				success: {
					updatedUser: updatedUser,
				},
			});
		});
	});

	return router;
};

const userObjProperties = {
	firstName: {
		type: "string",
		description: "First name.",
	},
	lastName: {
		type: "string",
		description: "Last name.",
	},
	email: {
		type: "string",
		description: "Email.",
	},
	password: {
		type: "string",
		description: "Password.",
	},
	password2: {
		type: "string",
		description: "Validate password.",
	},
	city: {
		type: "string",
		description: "City.",
	},
	province: {
		type: "string",
		description: "Province.",
	},
	postalCode: {
		type: "string",
		description: "Postal code.",
	},
	country: {
		type: "string",
		description: "Country.",
	},
	image: {
		type: "string",
		description: "Image.",
	},
};

/***** OPENAPI DOCS *******/

module.exports.apiDocs = {
	"/user/register": {
		post: {
			description: "Create a user account",
			tags: ["users"],
			requestBody: {
				description: "user model",
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: [
								"firstName",
								"lastName",
								"email",
								"password",
								"password2",
								"city",
								"province",
								"postalCode",
								"country",
							],
							properties: userObjProperties,
						},
						example: {
							firstName: "Johnny",
							lastName: "Smith",
							email: "jmsmith@email.com",
							password: "password",
							password2: "password",
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
							schema: {
								type: "object",
								description: "Single user object.",
								properties: {
									success: {
										type: "object",
										properties: {
											user: {
												...userObjProperties,
												id: {
													type: "integer",
												},
											},
										},
									},
								},
							},
							example: {
								success: {
									user: {
										id: 1,
										firstName: "Johnny",
										lastName: "Smith",
										email: "jmsmith@email.com",
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
						schema: {
							type: "object",
							description: "Email and password",
							properties: {
								email: {
									type: "string",
									required: true,
								},
								password: {
									type: "string",
									required: true,
								},
							},
						},
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
		get: {
			description: "Return a user's information if logged in",
			tags: ["users"],
			responses: {
				204: {
					description: "Session exists",
				},
			},
		},
	},
	"/user/logout": {
		post: {
			description: "Log out of a user account",
			tags: ["users"],
			requestBody: {
				description: "user email and password",
				content: {
					"application/json": {
						schema: {
							type: "object",
							description: "Email and password",
							properties: {
								email: {
									type: "string",
									required: true,
								},
								password: {
									type: "string",
									required: true,
								},
							},
						},
						example: {
							email: "jsmith@email.com",
							password: "password",
						},
					},
				},
			},
			responses: {
				201: {
					description: "Session Terminated",
				},
			},
		},
	},

	"/user/{userId}": {
		get: {
			description: "Get a user details",
			tags: ["users"],
			parameters: [
				{
					name: "userId",
					in: "path",
					schema: {
						type: "integer",
					},
					description: "get user by id",
					required: true,
				},
			],
			responses: {
				200: {
					description: "An individual user's details.",
					content: {
						"application/json": {
							schema: {
								type: "object",
							},
							example: {
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
									ratings: {
										totalRatings: 120,
										averageRating: 4.5,
									},
								},
							},
						},
					},
				},
			},
		},
		put: {
			description: "Update a user account",
			tags: ["users"],
			parameters: [
				{
					name: "userId",
					in: "path",
					schema: {
						type: "integer",
					},
					description: "update user by id",
					required: true,
				},
			],
			requestBody: {
				description: "user model",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: userObjProperties,
						},
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
							schema: {
								type: "object",
								description: "Single user object.",
								properties: {
									success: {
										type: "object",
										properties: {
											updatedUser: {
												...userObjProperties,
												id: {
													type: "integer",
												},
											},
										},
									},
								},
							},
							example: {
								success: {
									updatedUser: {
										id: 1,
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
		},
	},
};
