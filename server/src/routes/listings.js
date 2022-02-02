const router = require("express").Router();

module.exports = db => {

    router.get("/listings", (request, response) => {
        db.query(`SELECT * FROM listings`).then(({ rows: listings }) => {
            response.json(
                listings.reduce(
                    (previous, current) => ({ ...previous, [current.id]: current }),
                    {}
                )
            );
        });
    });

    return router;
};

// API documentation for Open API below

module.exports.apiDocs = {
    "/listings": {
        "get": {
            "description": "Return all listings from the system. Narrows results by query string if one is provided.",
            "parameters": {
                // search by location will need parameters - can use logged in user location, but to use browser geolocation for others would require google's api
                "keywordsParam": {
                    "name": "keywords", 
                    "in": "query",
                    "description": "search listings by keywords",
                    "required": false
                },
                "categoryParam": {
                    "name": "category",
                    "in": "query",
                    "description": "filter listings by category",
                    "required": false
                },
                "creatorParam": {
                    "name": "creatorId",
                    "in": "query",
                    "description": "filter listings by creator id",
                    "required": false
                }
            },
            "responses": {
                "200": {
                    "description": "An array of listings.",
                    "content": {
                        "application/json": {
                            "schema": {},
                            "examples": [
                                {
                                    "id": 1,
                                    "creatorId": 2,
                                    "title": "Mow My Lawn",
                                    "description": "Looking for someone to mow my lawn this week",
                                    "created": "2022-01-01 05:01:37 -5:00",
                                    "image_1": "https://images.unsplash.com/image_1.jpg",
                                    "price": 200.99,
                                },
                                {
                                    "id": 2,
                                    "creatorId": 1,
                                    "title": "Cut Grass",
                                    "description": "Looking for someone to cut grass",
                                    "created": "2022-01-12 05:01:37 -5:00",
                                    "image_1": "https://images.unsplash.com/image_1.jpg",
                                    "price": 200.99,
                                }
                                
                            ]
                        }
                    }
                }
            }
        },
        "post": {
            "description": "Create a listing",
            "requestBodies": {
                "description": "listing model",
                "content": {
                    "application/json": {
                        "schema": {},
                        "examples": {
                            "individualListing": {
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
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Listing Created",
                },
            }
        }
    },
    "/listings/:listingId": {
        "parameters": [
            {
                "name": "listingId",
                "in": "path",
                "required": true,
                "description": "listing ID of the individual listing"
            }
        ],
        "get": {
            "description": "Returns the details of an individual listing.",
            "responses": {
                "200": {
                    "description": "An individual listing.",
                    "content": {
                        "application/json": {
                            "schema": {},
                            "examples": {
                                "individualListing": {
                                    "id": 1,
                                    "creator": {
                                        "id": 2,
                                        "firstName": "Johnny",
                                        "lastName": "Smith"
                                    },
                                    "title": "Mow My Lawn",
                                    "description": "Looking for someone to mow my lawn this week",
                                    "created": "2022-01-01 05:01:37 -5:00",
                                    "image_1": "https://images.unsplash.com/image_1.jpg",
                                    "image_2": "https://images.unsplash.com/image_2.png",
                                    "image_3": "https://images.unsplash.com/image_3.svg",
                                    "price": 100.99,
                                    "city": "Toronto",
                                    "province": "Ontario",
                                    "postalCode": "A5T3BF",
                                    "country": "Canada"
                                }
                            }
                        }
                    }
                }
            }
        },
        "put": {
            "description": "Update a listing",
            "requestBodies": {
                "description": "listing model",
                "content": {
                    "application/json": {
                        "schema": {},
                        "examples": {
                            "individualListing": {
                                "id": 1,
                                "creatorId": 2,
                                "title": "Mow My Lawn",
                                "description": "Looking for someone to mow my lawn this week",
                                "created": "2022-01-01 05:01:37 -5:00",
                                "image_1": "https://images.unsplash.com/image_1.jpg",
                                "image_2": "https://images.unsplash.com/image_2.png",
                                "image_3": "https://images.unsplash.com/image_3.svg",
                                "price": 100.99,
                                "city": "Toronto",
                                "province": "Ontario",
                                "postalCode": "A5T3BF",
                                "country": "Canada"
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Updated ok",
                    "content": {
                        "application/json": {
                            "schema": {},
                            "examples": {
                                "id": 1,
                                "creatorId": 2,
                                "title": "Mow My Lawn",
                                "description": "Looking for someone to mow my lawn this week",
                                "created": "2022-01-01 05:01:37 -5:00",
                                "image_1": "https://images.unsplash.com/image_1.jpg",
                                "image_2": "https://images.unsplash.com/image_2.png",
                                "image_3": "https://images.unsplash.com/image_3.svg",
                                "price": 100.99,
                                "city": "Toronto",
                                "province": "Ontario",
                                "postalCode": "A5T3BF",
                                "country": "Canada"
                            }
                        }
                    },
                },
            },

        },
        "delete": {
            "description": "Deletes an individual listing",
            "responses": {
                204: {
                  description: "Listing deleted",
                },
            },
        }
    }
}
