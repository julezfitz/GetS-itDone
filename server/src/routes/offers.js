const router = require("express").Router();
const createNotification = require("../helpers/createNotification");

//may need another get for retrieving offers on a single listing

module.exports = db => {

    router.get("/offers", (request, response) => {
        const { bidderId } = request.query;
        let queryString = `SELECT offers.accepted, offers.pending, offers.id as offerId, listings.id as listingId, listings.title, 
        listings.image_1, listings.price, listings.created FROM offers
        JOIN listings ON offers.listing_id = listings.id
        WHERE bidder_id = ${bidderId};`

        db.query(queryString).then(({ rows: offers }) => {
            let offersArray = [];

            offers.forEach((offerObj) => {
                offersArray.push(
                    {
                        "listingId": offerObj.listingid,
                        "title": offerObj.title,
                        "price": offerObj.price,
                        "image_1": offerObj.image_1,
                        "created": offerObj.created,
                        "pending": offerObj.pending,
                        "accepted": offerObj.accepted,
                        "offerId": offerObj.offerid
                    }
                )
            });

            response.json(offersArray);
        });
    });

    router.post("/offers", (request, response) => {
        const { listingId, bidderId } = request.body;
        let offerId;

        db.query(
            `INSERT INTO offers (listing_id, bidder_id) 
                VALUES ($1::integer, $2::integer) RETURNING *;`,
            [listingId, bidderId]
        ).then((result) => {
            offerId = result.rows[0].id;

            return db.query(`SELECT creator_id FROM listings WHERE id = ${result.rows[0].listing_id};`);
        }).then((result) => {
            const listingCreatorId = result.rows[0].creator_id;

            //create a new notification to let the lister know they have a new offer
            createNotification(db, listingCreatorId, 3, offerId);
            response.status(201).json(`Application Created`);
        })
    });

    //put route to change an offer to rejected
    router.put("/offers/:offerId", (request, response) => {
        const offerId = parseInt(request.params.offerId);
        const { accepted } = request.body;

        //if accepted is false (offer rejected)
        if (!accepted) {
            const queryString1 = `UPDATE offers SET accepted = false, pending = false WHERE id = ${offerId} RETURNING *;`;
            let rejectedOffer;

            //set all other offers to not accepted and set pending to false
            db.query(queryString1).then((result) => {
                rejectedOffer = result.rows[0];
                //creates a notification for the person who's offer was rejected            
                return createNotification(db, rejectedOffer.bidder_id, 1, rejectedOffer.id);
            }).then(() => {
                response.status(200).json(`Offer rejected.`);
            })

            //if accepted is true (offer accepted)
        } else {
            //change the offer to accepted
            const queryString1 = `UPDATE offers SET accepted = true, pending = false WHERE id = ${offerId} RETURNING *;`;
            let acceptedOffer;

            db.query(queryString1).then((result) => {
                let listingId = (result.rows[0]).listing_id;
                acceptedOffer = result.rows[0];

                //set all other offers to not accepted and set pending to false
                return db.query(`UPDATE offers SET accepted = false, pending = false 
            WHERE listing_id = ${listingId} AND id <> ${offerId} RETURNING *;`);
            }).then((result) => {
                let rejectedOffers = result.rows;

                //creates a notification for the person who's offer was accepted            
                createNotification(db, acceptedOffer.bidder_id, 2, acceptedOffer.id);

                //loop through rejected offers and create a notification for each
                for (offer in rejectedOffers) {
                    createNotification(db, rejectedOffers[offer].bidder_id, 1, rejectedOffers[offer].id);
                }

                response.status(200).json(`Offer accepted. All other offers declined.`);
            })
        }
    });

    router.delete("/offers/:offerId", (request, response) => {
        const offerId = parseInt(request.params.offerId);

        let queryString = `DELETE FROM offers WHERE id = ${offerId};`
        db.query(queryString).then(() => {
            response.status(204).json(`Offer retracted`);
        });
    });

    return router;
}

// API documentation for Open API below

module.exports.apiDocs = {
    "/offers": {
        "get": {
            "description": "Return all applications by an individual user from the system.",
            "tags": ["offers"],
            "parameters": [{
                "name": "bidderId",
                "type": "integer",
                "in": "query",
                "description": "get applications for a user",
                "required": true
            }],
            "responses": {
                "200": {
                    "description": "An array of applications.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "description": "Array of offers made by a single user.",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "title": {
                                            "type": "string",
                                        },
                                        "pending": {
                                            "type": "boolean",
                                        },
                                        "accepted": {
                                            "type": "boolean",
                                        },
                                        "listingId": {
                                            "type": "integer",
                                        },
                                        "offerId": {
                                            "type": "integer",
                                        },
                                        "price": {
                                            "type": "number",
                                        },
                                        "created": {
                                            "type": "string",
                                        },
                                        "image_1": {
                                            "type": "string",
                                        },
                                    }
                                }
                            },
                            "example": [
                                {
                                    "listingId": 5,
                                    "title": "Walk my dog",
                                    "price": 50,
                                    "image_1": "https://images.unsplash.com/image_1.jpg",
                                    "created": "2022-01-01 05:01:37 -5:00",
                                    "pending": "false",
                                    "accepted": "false",
                                    "offerId": 1
                                },
                                {
                                    "listingId": 6,
                                    "title": "Feed the cat",
                                    "price": 40,
                                    "image_1": "https://images.unsplash.com/image_2.jpg",
                                    "created": "2022-02-01 05:01:37 -5:00",
                                    "pending": "false",
                                    "accepted": "false",
                                    "offerId": 2
                                },
                            ]
                        }
                    }
                }
            }
        },
        "post": {
            "description": "Creates an offer to do a job.",
            "tags": ["offers"],
            "requestBody": {
                "description": "application model",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": ["listingId", "bidderId"],
                            "properties": {
                                "listingId": {
                                    "type": "integer",
                                    "description": "The listing ID."
                                },
                                "bidderId": {
                                    "type": "integer",
                                    "description": "The applicant ID."
                                },
                            }
                        },
                        "example": {
                            "listingId": 1,
                            "bidderId": 2
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Application Created",
                },
            }
        },
    },
    "/offers/{offerId}": {
        "put": {
            "description": "Accept an offer and update status of all other pending offers on that job",
            "tags": ["offers"],
            "parameters": [
                {
                    "name": "offerId",
                    "in": "path",
                    "schema": {
                        "type": "integer"
                    },
                    "description": "accept offer by offer ID",
                    "required": true
                },
            ],
            "requestBody": {
                "description": "accepted = true or false",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": ["accepted"],
                            "properties": {
                                "accepted": {
                                    "type": "boolean",
                                    "description": "'true' to accept an offer, 'false' to reject it"
                                }
                            }
                        },
                        "example": {
                            "accepted": false,
                        }
                    }
                }
            },
            "responses": {
                204: {
                    "description": "Offer accepted. All other offers declined.",
                },
                204: {
                    "description": "Offer rejected.",
                },
            },
        },
        "delete": {
            "description": "Delete an offer to do a job",
            "tags": ["offers"],
            "parameters": [
                {
                    "name": "offerId",
                    "in": "path",
                    "schema": {
                        "type": "integer"
                    },
                    "description": "delete/retract by offer ID",
                    "required": true
                },
            ],
            "responses": {
                204: {
                    description: "Offer retracted",
                },
            },
        }
    }
}