const router = require("express").Router();

module.exports = db => {
	router.get("/categories", (request, response) => {
		db.query(`SELECT * FROM categories`).then(({ rows: categories }) => {
			response.json(categories);
		});
	});

	router.post("/categories/listings", (request, response) => {
		const { categoryId, listingId } = request.body;

		db.query(
			`INSERT INTO listing_categories (category_id, listing_id) VALUES ($1::integer, $2::integer) RETURNING *;`,
			[categoryId, listingId]
		)
			.then(result => {
				console.log(result);
				response.status(201).json(result.rows[0]);
			})
			.catch(e => console.log(e));
	});

	return router;
};

// API documentation for Open API below

module.exports.apiDocs = {
	"/categories": {
		get: {
			description: "Return all categories.",
			tags: ["categories"],
			responses: {
				200: {
					description: "An array of categories.",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									type: "object",
									properties: {
										id: {
											type: "integer",
										},
										category: {
											type: "string",
										},
									},
								},
							},
							example: [
								{
									id: 1,
									category: "Home Improvement",
								},
								{
									id: 2,
									category: "Painting",
								},
							],
						},
					},
				},
			},
		},
	},
	"/categories/listings": {
		post: {
			description: "Create a listing category relation",
			tags: ["categories"],
			requestBody: {
				description: "listing and category ids",
				content: {
					"application/json": {
						schema: {
							type: "object",
						},
						example: { listingId: 2, categoryId: 3 },
					},
				},
			},
			responses: {
				201: {
					description: "Listing category connection created",
				},
			},
		},
	},
};
