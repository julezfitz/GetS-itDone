const router = require("express").Router();

//may need another get for retrieving offers on a single listing

module.exports = db => {

    router.get("/notifications", (request, response) => {
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
return router;
}

// API documentation for Open API below

module.exports.apiDocs = {
    "/notifications": {
        "get": {
            "description": "Return notifications for a user.",
            "tags": ["notifications"],
            "parameters": [{
                "name": "userId",
                "in": "query",
                "description": "get notifications for a user",
                "required": true
            }],
            "responses": {
                "200": {
                    "description": "An array of notifications.",
                    "content": {
                        "application/json": {
                            "schema": {},
                            "example": [
                                {
                                    "notificationMessage": "Your offer has been declined.",
                                    "viewed": "true",
                                    "offerId": 2,
                                    "listingId": 2,
                                    "created": "2022-03-01 05:01:37 -5:00"                                     
                                },
                                {
                                    "notificationMessage": "You have a new offer!",
                                    "viewed": "false",
                                    "offerId": 3,
                                    "listingId": 3,
                                    "created": "2022-03-01 05:01:37 -5:00"                                     
                                },
                            ]
                        }
                    }
                }
            }
        }
    }
}