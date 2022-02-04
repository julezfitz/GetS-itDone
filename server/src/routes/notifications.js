const router = require("express").Router();

module.exports = db => {

    router.get("/notifications", (request, response) => {
        const { userId } = request.query;
        let queryString = `SELECT user_notifications.viewed, user_notifications.created, 
        notifications.notification_message, user_notifications.offer_id, offers.listing_id
        FROM user_notifications
        JOIN notifications ON user_notifications.notification_id = notifications.id
        JOIN offers ON user_notifications.offer_id = offers.id
        WHERE user_notifications.user_id = ${userId};`

        db.query(queryString).then(({ rows: notifications }) => {

            let notificationsArray = [];

            notifications.forEach((notificationObj) => {
                if(!notificationObj.viewed){
                notificationsArray.push(
                    {
                        "notificationMessage": notificationObj.notification_message,
                        "viewed": notificationObj.viewed,
                        "offerId": notificationObj.offer_id,
                        "listingId": notificationObj.listing_id,
                        "created": notificationObj.created,
                    }
                )
                }
            });

            response.json(notificationsArray);
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