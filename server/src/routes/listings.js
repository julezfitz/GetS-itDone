const { query } = require("express");

const router = require("express").Router();

module.exports = db => {

    router.get("/listings", (request, response) => {
        const { keywords, category, creatorId, orderBy, sortOrder } = request.query;

        let queryString = `SELECT listings.*, users.first_name, users.last_name, users.id, categories.category 
        FROM listings
        JOIN listing_categories ON (listings.id = listing_categories.listing_id)
        JOIN categories ON (categories.id = listing_categories.category_id) 
        JOIN users ON (listings.creator_id = users.id)`

        if(creatorId) {
            queryString += ` WHERE listings.creator_id = ${creatorId}`}

        category ? (queryString += ` WHERE listing_categories.category_id = ${category}`) : "";

        keywords ? (queryString += ` WHERE LOWER(listings.title) LIKE LOWER('%${keywords}%')`) : "";
        orderBy ? (queryString += ` ORDER BY listings.${orderBy}`) : "";
        sortOrder ? (queryString += ` ${sortOrder}`) : "";
        db.query(queryString += `;`).then(({ rows: listings }) => {
            response.json(listings);
        });
    });

    router.post("/listings", (request, response) => {
        const { creatorId, title, description, image_1, image_2, image_3, price, city, province, postalCode,
            country } = request.body;

        db.query(
            `INSERT INTO listings (creator_id, title, description, image_1, image_2, image_3, price, city, 
                    province, postal_code, country) VALUES ($1::integer, $2::text, $3::text, $4::text, $5::text, 
                        $6::text, $7, $8::text, $9::text, $10::text, $11::text) RETURNING *;`,
            [creatorId, title, description, image_1, image_2, image_3, price, city, province, postalCode,
                country]
        ).then((result) => {
            response.status(201).json(result.rows[0]);
        });
    });

    router.get("/listings/:listingId", (request, response) => {
        let queryString = `SELECT * FROM listings WHERE id = ${request.params.listingId};`
        db.query(queryString).then((result) => {
            response.json(result.rows[0]);
        });
    });

    router.delete("/listings/:listingId", (request, response) => {
        let queryString = `DELETE FROM listings WHERE id = ${request.params.listingId};`
        db.query(queryString).then(() => {
            response.status(204).json(`Listing deleted`);
        });
    });

    router.put("/listings/:listingId", (request, response) => {

        const { creatorId, title, description, image_1, image_2, image_3, price, city, province, postalCode,
            country } = request.body;

        const listingUpdates = [
            { "creator_id": creatorId },
            { "title": title },
            { "description": description },
            { "image_1": image_1 },
            { "image_2": image_2 },
            { "image_3": image_3 },
            { "price": price },
            { "city": city },
            { "province": province },
            { "postal_code": postalCode },
            { "country": country }
        ];

        let queryString = `UPDATE listings SET`;

        let queryArray = [];

        listingUpdates.forEach((updateObj) => {
            Object.keys(updateObj).forEach((key) => {
                queryArray.push(` ${key} = '${updateObj[key]}'`)
            });
        });

        queryString += queryArray.join(", ");
        queryString += ` WHERE id = ${request.params.listingId} RETURNING *;`

        db.query(queryString).then((result) => {
            response.json(result.rows[0]);
        });
    });

    router.get("/listings/:listingId/offers", (request, response) => {
        let listingQueryString = `SELECT * FROM listings WHERE id = ${request.params.listingId};`
        let offersQueryString = `SELECT offers.id as offerId, offers.bidder_id as bidderid, offers.accepted, offers.pending, users.first_name as firstName,
        users.last_name as lastName, users.email, AVG(user_ratings.rating) as averageRating, COUNT(user_ratings.rating) as ratingCount
        FROM offers
        JOIN users ON offers.bidder_id = users.id
        JOIN user_ratings ON users.id = user_ratings.ratee_id
        WHERE offers.listing_id = ${request.params.listingId}
        GROUP BY offers.id, users.first_name, users.last_name, users.email;`

        let listingObject;

        db.query(listingQueryString).then((result) => {
            listingObject = result.rows[0];
            return db.query(offersQueryString);
        }).then((result) => {

            let ratingsArray = [];

            (result.rows).forEach((ratingObj) => {
                let averageRating = parseInt(ratingObj.averagerating);
                let ratingCount = parseInt(ratingObj.ratingcount);

                ratingsArray.push(
                    {
                        "offerId": ratingObj.offerid,
                        "bidderId": ratingObj.bidderid,
                        "firstName": ratingObj.firstname,
                        "lastName": ratingObj.lastname,
                        "email": ratingObj.email,
                        "averageRating": averageRating,
                        "ratingCount": ratingCount,
                        "pending": ratingObj.pending,
                        "accepted": ratingObj.accepted
                    }
                )
            });

            listingObject = { ...listingObject, "offers": ratingsArray };
            response.json(listingObject);
        })
    });

    return router;
};

// API documentation for Open API below

const exampleListing1 = {
    "id": 1,
    "creatorId": 2,
    "title": "Mow My Lawn",
    "description": "Looking for someone to mow my lawn this week",
    "created": "2022-01-01 05:01:37 -5:00",
    "image_1": "https://images.unsplash.com/image_1.jpg",
    "image_2": "https://images.unsplash.com/image_2.png",
    "image_3": "https://images.unsplash.com/image_3.svg",
    "price": 200.99,
    "city": "Toronto",
    "province": "Ontario",
    "postalCode": "A5T3BF",
    "country": "Canada"
};

const exampleListing2 = {
    "id": 2,
    "creatorId": 1,
    "title": "Cut Grass",
    "description": "Looking for someone to cut grass",
    "created": "2022-01-12 05:01:37 -5:00",
    "image_1": "https://images.unsplash.com/image_1.jpg",
    "image_2": null,
    "image_3": null,
    "price": 200.99,
    "city": "Toronto",
    "province": "Ontario",
    "postalCode": "A5T3BF",
    "country": "Canada"
};

const listingSchema = {
    "type": "object",
    "required": ["creatorId", "title", "description", "price", "city", "province", "postalCode", "country"],
    "properties": {
        "creatorId": {
            "type": "integer",
            "description": "The creator ID."
        },
        "title": {
            "type": "string",
            "description": "The title of the listing."
        },
        "description": {
            "type": "string",
            "description": "The listing description."
        },
        "image_1": {
            "type": "string",
            "description": "Listing image 1."
        },
        "image_2": {
            "type": "string",
            "description": "Listing image 2."
        },
        "image_3": {
            "type": "string",
            "description": "Listing image 3."
        },
        "price": {
            "type": "number",
            "minimum": 0,
            "description": "The listing price."
        },
        "city": {
            "type": "string",
            "description": "The listing city."
        },
        "province": {
            "type": "string",
            "description": "The listing province."
        },
        "postalCode": {
            "type": "string",
            "description": "The listing postal code."
        },
        "country": {
            "type": "string",
            "description": "The listing country."
        }
    }
};

module.exports.apiDocs = {
    "/listings": {
        "get": {
            "description": "Return all listings from the system. Narrows results by query string if one is provided.",
            "tags": ["listings"],
            "parameters": [
                // search by location will need parameters - can use logged in user location, but to use browser geolocation for others would require google's api
                {
                    "name": "keywords",
                    "in": "query",
                    "description": "search listings by keywords",
                    "schema": {
                        "type": "string"
                    },
                    "required": false
                },
                {
                    "name": "category",
                    "in": "query",
                    "description": "filter listings by category",
                    "schema": {
                        "type": "string"
                    },
                    "required": false
                },
                {
                    "name": "creatorId",
                    "in": "query",
                    "description": "filter listings by creator id",
                    "schema": {
                        "type": "integer"
                    },
                    "required": false
                },
                {
                    "name": "orderBy",
                    "in": "query",
                    "description": "what it will be ordered by (price, date)",
                    "schema": {
                        "type": "string"
                    },
                    "required": false
                },
                {
                    "name": "sortOrder",
                    "in": "query",
                    "description": "ascending or descending order",
                    "schema": {
                        "type": "string",
                        "enum": ["asc", "desc"]
                    },
                    "required": false
                },
            ],
            "responses": {
                200: {
                    "description": "An array of listings.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": listingSchema
                            },
                            "example": [exampleListing1, exampleListing2],
                        }
                    }
                }
            },
        },
        "post": {
            "description": "Create a listing",
            "tags": ["listings"],
            "requestBody": {
                "description": "listing model",
                "content": {
                    "application/json": {
                        "schema": listingSchema,
                        "example": { ...exampleListing1 }
                    }
                }
            },
            "responses": {
                201: {
                    "description": "Listing Created",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "items": listingSchema
                            },
                            "example": exampleListing1,
                        }
                    }
                },
            }
        }
    },
    "/listings/{listingId}": {
        "parameters": [
            {
                "name": "listingId",
                "in": "path",
                "schema": {
                    "type": "integer"
                },
                "required": true,
                "description": "listing ID of the individual listing"
            }
        ],
        "get": {
            "description": "Returns the details of an individual listing.",
            "tags": ["listings"],
            "responses": {
                200: {
                    "description": "An individual listing.",
                    "content": {
                        "application/json": {
                            "schema": listingSchema,
                            "example": exampleListing1
                        }
                    }
                }
            }
        },
        "put": {
            "description": "Update a listing",
            "tags": ["listings"],
            "requestBody": {
                "description": "listing model",
                "content": {
                    "application/json": {
                        "schema": { ...listingSchema, "required": [] },
                        "example": { ...exampleListing1, title: "Cut my lawn" }
                    }
                }
            },
            "responses": {
                200: {
                    "description": "Updated ok",
                    "content": {
                        "application/json": {
                            "schema": listingSchema,
                            "example": { ...exampleListing1, title: "Cut my lawn" }
                        }
                    },
                },
            },

        },
        "delete": {
            "description": "Deletes an individual listing",
            "tags": ["listings"],
            "responses": {
                204: {
                    "description": "Listing deleted",
                },
            },
        }
    },
    "/listings/{listingId}/offers": {
        "parameters": [
            {
                "name": "listingId",
                "in": "path",
                "schema": {
                    "type": "integer"
                },
                "required": true,
                "description": "listing ID of the individual listing"
            }
        ],
        "get": {
            "description": "Returns the details of an individual listing along with its associated offers.",
            "tags": ["listings"],
            "responses": {
                200: {
                    "description": "An individual listing with its offers.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "required": ["creatorId", "title", "description", "price", "city", "province", "postalCode", "country"],
                                "properties": {
                                    ...listingSchema.properties,  "offers": {
                                        "type": "array",
                                        "description": "Array of offers.",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "offerId": {
                                                    "type": "integer",
                                                },
                                                "bidderId": {
                                                    "type": "integer",
                                                },
                                                "firstName": {
                                                    "type": "string",
                                                },
                                                "lastName": {
                                                    "type": "string",
                                                },
                                                "email": {
                                                    "type": "string",
                                                },
                                                "averageRating": {
                                                    "type": "number",
                                                },
                                                "ratingCount": {
                                                    "type": "integer",
                                                },
                                                "pending": {
                                                    "type": "boolean",
                                                },
                                                "accepted": {
                                                    "type": "boolean",
                                                },
                                            }
                                        }
                                    }
                                }
                            },
                            "example": {
                                ...exampleListing1, "offers": [
                                    {
                                        "offerId": 4,
                                        "bidderId": 2,
                                        "firstName": "Bill",
                                        "lastName": "Thorne",
                                        "email": "bthorne@email.com",
                                        "averageRating": 4.5,
                                        "ratingCount": 50,
                                        "pending": "false",
                                        "accepted": "false",
                                    },
                                    {
                                        "offerId": 5,
                                        "bidderId": 3,
                                        "firstName": "Jill",
                                        "lastName": "Fardy",
                                        "email": "jfardy@email.com",
                                        "averageRating": 4,
                                        "ratingCount": 60,
                                        "pending": "false",
                                        "accepted": "false",
                                    },
                                ]
                            }
                        }
                    }
                }
            }
        }
    },
};
