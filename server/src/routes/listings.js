const { query } = require("express");

const router = require("express").Router();

module.exports = db => {

    router.get("/listings", (request, response) => {
        const { keywords, category, creatorId, orderBy, sortOrder } = request.query;

        let queryString = `SELECT * FROM listings`;

        creatorId ? (queryString += ` WHERE creator_id = ${creatorId}`) : "";

        category ? (queryString += ` JOIN listing_categories ON listings.id = listing_categories.listing_id 
        WHERE listing_categories.category_id = ${category}`) : "";

        keywords ? (queryString += ` WHERE LOWER(title) LIKE LOWER('%${keywords}%')`) : "";
        orderBy ? (queryString += ` ORDER BY ${orderBy}`) : "";
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
                        $6::text, $7, $8::text, $9::text, $10::text, $11::text);`,
            [creatorId, title, description, image_1, image_2, image_3, price, city, province, postalCode,
                country]
        ).then(() => {
            response.json(`Listing Created`);
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
            response.json(`Listing deleted`);
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
        users.last_name as lastName, AVG(user_ratings.rating) as averageRating, COUNT(user_ratings.rating) as ratingCount
        FROM offers
        JOIN users ON offers.bidder_id = users.id
        JOIN user_ratings ON users.id = user_ratings.ratee_id
        WHERE offers.listing_id = ${request.params.listingId}
        GROUP BY offers.id, users.first_name, users.last_name;`
        
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
                        "averageRating": averageRating,
                        "ratingCount": ratingCount,
                        "pending": ratingObj.pending,
                        "accepted": ratingObj.accepted
                    }
                )
            });

            listingObject = {...listingObject, "offers": ratingsArray};
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
                    "required": false
                },
                {
                    "name": "creatorId",
                    "in": "query",
                    "description": "filter listings by creator id",
                    "required": false
                },
                {
                    "name": "orderBy",
                    "in": "query",
                    "description": "what it will be ordered by (price, date)",
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
                                "type": "array"
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
                        "schema": {},
                        "example": { ...exampleListing1 }
                    }
                }
            },
            "responses": {
                201: {
                    "description": "Listing Created",
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
                            "schema": {},
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
                        "schema": {},
                        "example": { ...exampleListing1, title: "Cut my lawn" }
                    }
                }
            },
            "responses": {
                200: {
                    "description": "Updated ok",
                    "content": {
                        "application/json": {
                            "schema": {},
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
                            "schema": {},
                            "example": {
                                ...exampleListing1, "offers": [
                                    {
                                        "offerId": 4,
                                        "bidderId": 2,
                                        "firstName": "Bill",
                                        "lastName": "Thorne",
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
