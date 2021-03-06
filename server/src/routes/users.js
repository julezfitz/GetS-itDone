const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { query } = require("express");
// const passport = require("passport");
const checkIfEmpty = require("../helpers/auth/checkIfEmpty");
const trimFields = require("../helpers/auth/trimFields");

const registerErrors = {
	errors: [],
};

module.exports = db => {
	router.post("/user/session", (req, res, next) => {
		const { email, password } = req.body;
		const authResponse = {
			authentication: {
				isAuthenticated: false,
				user: null,
				errors: {},
			},
		};

		const emptyFields = checkIfEmpty(req.body);

		//If any field is empty, send error right away
		if (emptyFields[0]) {
			authResponse.authentication.errors = {
				message: "Fields cannot be empty",
				fields: [...emptyFields],
			};
			res.send(authResponse);
			return;
		}

		//Check for user
		db.query(
			`
			SELECT *
			FROM users
			WHERE email = $1;
		`,
			[email]
		).then(response => {
			const user = response.rows;

			//If an email is found, compare passwords
			if (user.length > 0) {
				bcrypt.compare(password, user[0].password, (err, isMatch) => {
					if (err) throw err;

					if (isMatch) {
						const userObject = {
							id: user[0].id,
							email: user[0].email,
							password: user[0].password,
							firstName: user[0]["first_name"],
							lastName: user[0]["last_name"],
							city: user[0]["city"],
							postalCode: user[0]["postal_code"],
							country: user[0]["country"],
							province: user[0]["province"],
							image: user[0].image,
						};

						req.session["user"] = userObject;
						authResponse.authentication.isAuthenticated = true;
						authResponse.authentication.user = userObject;
						res.send(authResponse);
						return;
					} else {
						authResponse.authentication.errors = {
							message: "Incorrect password",
							fields: [{ fieldName: "password" }],
						};
						res.send(authResponse);
						return;
					}
				});
			} else {
				authResponse.authentication.errors = {
					message: "No account is registered with that email address",
					fields: [],
				};
				res.send(authResponse);
				return;
			}
		});
	});

	//User attempts to log out
	router.post("/user/logout", (req, res) => {
		const response = {
			authentication: {
				isLoggedOut: true,
			},
		};
		req.session = null;

		res.status(200).send(response);
	});

	//Check to see if a user is logged in
	router.get("/user/session", (req, res) => {
		const authResponse = { isAuthenticated: false, user: null };

		if (req.session.user) {
			authResponse.isAuthenticated = true;
			authResponse.user = req.session.user;
			res.send(authResponse);
			return;
		}

		res.send(authResponse);
		return;
	});

	//User attempts to register
	router.post("/user/register", (req, res) => {
		const response = {
			registration: {
				isRegistered: false,
				errors: {},
				user: null,
			},
		};

		const emptyFields = checkIfEmpty(req.body);

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
		} = req.body;

		// const hashedPassword = bcrypt.hashSync(password, 12);

		//Check if any fields are empty

		if (emptyFields[0]) {
			response.registration.errors = {
				message: "Fields cannot be empty",
				fields: [...emptyFields],
			};
			res.send({ ...response });
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
					response.registration.errors = {
						message: "E-mail already exists",
						fields: [{ fieldName: "email" }],
					};
					res.send(response);
					return;
				}

				//If user does not exist, check to see if password + passwordConfirmation match
				if (password !== passwordConfirmation) {
					response.registration.errors = {
						message: "Passwords must match",
						fields: [
							{ fieldName: "password" },
							{ fieldName: "passwordConfirmation" },
						],
					};
					res.send(response);
					return;
				}

				const hashedPassword = bcrypt.hashSync(password, 12);
				//Success - register user
				return db
					.query(
						`INSERT INTO users(first_name, last_name, email, password, city, province, postal_code, country)
      			VALUES($1, $2, $3, $4, $5, $6, $7, $8)
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
						]
					)
					.then(success => {
						//If user has successfully been registered in db, send success msg to front end
						req.session["user"] = {
							id: success.rows[0].id,
							email: success.rows[0].email,
							firstName: success.rows[0]["first_name"],
							lastName: success.rows[0]["last_name"],
							city: success.rows[0]["city"],
							postalCode: success.rows[0]["postal_code"],
							country: success.rows[0]["country"],
							province: success.rows[0]["province"],
						};
						response.registration.isRegistered = true;
						response.registration.user = req.session.user;

						res.send(response);
						return;
					})
					.catch(err => {
						//Catch any possible server/db errors and send response
						response.registration.errors = {
							message: "Server error",
							fields: [],
						};

						res.send(response);
					});
			});
	});

	router.get("/user/:userId", (req, res) => {
		const { userId } = req.params;
		let getUser;

		db.query(
			`
			SELECT * FROM users
			WHERE users.id = $1
		`,
			[userId]
		).then(user => {
			if (!user.rows[0]) {
				res.status(404).send("User not found");
				return;
			}
			getUser = user.rows[0];

			db.query(
				`
				SELECT COUNT(ratee_id) AS totalratings,
				ROUND(AVG(rating)) AS averagerating
				FROM user_ratings
				WHERE ratee_id = $1;
			`,
				[userId]
			).then(ratingInfo => {
				let user = {
					id: getUser.id,
					firstName: getUser.first_name,
					lastName: getUser.last_name,
					email: getUser.email,
					password: getUser.password,
					city: getUser.city,
					province: getUser.province,
					postalCode: getUser.postal_code,
					country: getUser.country,
					image: getUser.image,
					ratings: ratingInfo.rows,
				};

				res.send({ user });
				return;
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

		const hashedPassword =
			password !== req.session.user.password
				? bcrypt.hashSync(password, 12)
				: null;

		let values = Object.values(req.body);
		const passwordIndex = values.indexOf(password);

		if (hashedPassword) {
			values[passwordIndex] = hashedPassword;
		} else {
			//If no password was updated, do not update in db
			values.splice(3, 1);
		}

		const queryParams = values;

		const keys = Object.keys(req.body);
		!hashedPassword && keys.splice(keys.indexOf("password"), 1);

		keys.forEach((key, i) => {
			key = key.replace(/([A-Z])/g, "_$1").toLowerCase();
			queryString.push(`${key} = $${(i += 1)}`);
		});

		queryString =
			"UPDATE users SET " +
			queryString.join(", ") +
			` WHERE id = ${userId} RETURNING *;`;

		db.query(queryString, queryParams).then(user => {
			if (!user.rows.length) {
				res.status(404).send("User does not exist");
				return;
			}

			const updatedUser = {
				id: user.rows[0].id,
				email: user.rows[0].email,
				password: user.rows[0].password,
				firstName: user.rows[0]["first_name"],
				lastName: user.rows[0]["last_name"],
				city: user.rows[0]["city"],
				postalCode: user.rows[0]["postal_code"],
				country: user.rows[0]["country"],
				province: user.rows[0]["province"],
				image: user.rows[0].image,
			};

			req.session.user = updatedUser;

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
				400: {
					description: "Google Error",
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
	"/user/google": {
		post: {
			description: "Login or register to a user account using google",
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
		get: {
			description: "Login or register to a user account using google",
			tags: ["users"],

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
	},
	"/user/google/callback": {
		get: {
			description: "Google auth/passport redirect",
			tags: ["users"],
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
