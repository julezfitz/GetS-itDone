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
        const { listingId, applicantId } = request.body;

        db.query(
            `INSERT INTO offers (listing_id, bidder_id) 
                VALUES ($1::integer, $2::integer);`,
            [listingId, applicantId]
        ).then(() => {
            response.status(201).json(`Application Created`);
        });
    });

    //put route to change an offer to accepted and update pending on that and all other offers
    router.put("/offers", (request, response) => {
        const { offerId } = request.query;
        const queryString1 = `UPDATE offers SET accepted = true, pending = false WHERE id = ${offerId} RETURNING *;`;
        let acceptedOffer;
        // each notification will need userId, notificationId, offerId

        //set all other offers to not accepted and set pending to false
        db.query(queryString1).then((result) => {
            let listingId = (result.rows[0]).listing_id;
            acceptedOffer = result.rows[0];

            return db.query(`UPDATE offers 
            SET accepted = false, pending = false 
            WHERE listing_id = ${listingId} AND id <> ${offerId} RETURNING *;`);
        }).then((result) => {

            let acceptedAndRejectedOffers = {
                "acceptedOffer": acceptedOffer,
                "rejectedOffers": result.rows
            };
           
           //creates a notification for the person who's offer was accepted
            createNotification(db, acceptedAndRejectedOffers.acceptedOffer.bidder_id, 2, acceptedAndRejectedOffers.acceptedOffer.id);

            //loop through rejected offers and add a notification for each to the database
            for(offer in acceptedAndRejectedOffers.rejectedOffers) {
                createNotification(db, offer.bidder_id, 1, offer.id);
            }
            
            response.status(200).json(`Offer accepted. All other offers declined.`);
        })
    });

    router.delete("/offers", (request, response) => {
        const { applicantId, listingId } = request.query;

        let queryString = `DELETE FROM offers WHERE bidder_id = ${applicantId} AND listing_id = ${listingId};`
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
            "requestBodies": {
                "description": "application model",
                "content": [{
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
                        "applicantId": 2
                    }
                }]
            },
            "responses": {
                "201": {
                    "description": "Application Created",
                },
            }
        },
        "put": {
            "description": "Accept an offer and update status of all other pending offers on that job",
            "tags": ["offers"],
            "parameters": [
                {
                    "name": "offerId",
                    "type": "integer",
                    "in": "query",
                    "description": "accept offer by offer ID",
                    "required": true
                },
            ],
            "responses": {
                204: {
                    "description": "Offer accepted. All other offers declined.",
                },
            },
        },
        "delete": {
            "description": "Delete an offer to do a job",
            "tags": ["offers"],
            "parameters": [
                {
                    "name": "applicantId",
                    "type": "integer",
                    "in": "query",
                    "description": "delete offer for a listing by the applicant",
                    "required": true
                },
                {
                    "name": "listingId",
                    "type": "integer",
                    "in": "query",
                    "description": "delete offer for a listing by the applicant",
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