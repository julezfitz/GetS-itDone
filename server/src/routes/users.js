const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

// API documentation for Open API below

const loginErrors = {
	errors: [],
};

module.exports = db => {
	router.post("/user/session", (req, res, next) => {
		console.log("in here!");
		const { email, password } = req.body;

		if (!email || !password) {
			loginErrors.errors.push({ message: "Please fill out the fields." });
			res.send(loginErrors);
			return;
		}

		passport.authenticate("local", (err, user, info) => {
			if (err) throw err;
			if (!user) {
				loginErrors.errors.push({ message: "User doesn't exist" });
				res.send(loginErrors);
				return;
			} else {
				req.logIn(user, err => {
					if (err) throw err;
					res.send("Successfully Authenticated");
				});
			}
		})(req, res, next);
	});

	router.get("/user/session", (req, res) => {
		res.send("hello!");
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
					description: "User Created",
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
								errors: loginErrors.errors,
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
