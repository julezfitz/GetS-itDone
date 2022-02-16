const router = require("express").Router();

module.exports = db => {

    router.get("/notifications", (request, response) => {
        const { userId } = request.query;
        let queryString = `SELECT user_notifications.viewed, user_notifications.created, 
        notifications.notification_message, user_notifications.offer_id, user_notifications.id as notification_id,
        offers.listing_id, listings.title
        FROM user_notifications
        JOIN notifications ON user_notifications.notification_id = notifications.id
        JOIN offers ON user_notifications.offer_id = offers.id
        JOIN listings ON offers.listing_id = listings.id
        WHERE user_notifications.user_id = ${userId} AND user_notifications.viewed = ${false};`

        db.query(queryString).then(({ rows: notifications }) => {

            let notificationsArray = [];

            notifications.forEach((notificationObj) => {
                if (!notificationObj.viewed) {
                    notificationsArray.push(
                        {
                            "notificationMessage": notificationObj.notification_message,
                            "viewed": notificationObj.viewed,
                            "offerId": notificationObj.offer_id,
                            "listingId": notificationObj.listing_id,
                            "created": notificationObj.created,
                            "title": notificationObj.title,
                            "notificationId": notificationObj.notification_id
                        }
                    )
                }
            });

            response.json(notificationsArray);
        });
    });

    //This route may end up being redundant because creation is being handled through helper createNotifications.js
    router.post("/notifications", (request, response) => {
        const { userId, notificationId, offerId } = request.query;

        db.query(
            `INSERT INTO user_notifications (user_id, offer_id, notification_id) 
                VALUES ($1::integer, $2::integer, $3::integer);`,
            [userId, notificationId, offerId]
        ).then(() => {
            response.status(201).json(`Notification created`);
        });
    });

    router.put("/notifications/:notificationId", (request, response) => {
        let queryString = `UPDATE user_notifications SET viewed = true WHERE id = ${request.params.notificationId}`;
        db.query(queryString).then(() => {
            response.status(204).json(`Notification marked as viewed`);
        });
    });

    return router;
}

// API documentation for Open API below

module.exports.apiDocs = {
    "/notifications": {
        "get": {
            "description": "Return unviewed notifications for a user.",
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
                            "schema": {
                                "type": "array",
                                "description": "Array of notifications.",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "notificationMessage": {
                                            "type": "string",
                                        },
                                        "viewed": {
                                            "type": "boolean",
                                        },
                                        "offerId": {
                                            "type": "integer",
                                        },
                                        "listingId": {
                                            "type": "integer",
                                        },
                                        "notificationId": {
                                            "type": "integer",
                                        },
                                        "created": {
                                            "type": "string",
                                        },
                                    }
                                }
                            },
                            "example": [
                                {
                                    "notificationMessage": "Your offer has been declined.",
                                    "viewed": "true",
                                    "offerId": 2,
                                    "listingId": 2,
                                    "created": "2022-03-01 05:01:37 -5:00",
                                    "notificationId": 1
                                },
                                {
                                    "notificationMessage": "You have a new offer!",
                                    "viewed": "false",
                                    "offerId": 3,
                                    "listingId": 3,
                                    "created": "2022-03-01 05:01:37 -5:00",
                                    "notificationId": 2
                                },
                            ]
                        }
                    }
                }
            }
        },

        "post": {
            "description": "Creates a new notification.",
            "tags": ["notifications"],
            "parameters": [
                {
                    "name": "userId",
                    "type": "integer",
                    "in": "query",
                    "description": "Id of user to receive the notification",
                    "required": true
                },
                {
                    "name": "notificationId",
                    "type": "integer",
                    "in": "query",
                    "description": "1 for decline, 2 for accept, 3 for new offer",
                    "required": true
                },
                {
                    "name": "offerId",
                    "type": "integer",
                    "in": "query",
                    "description": "Offer id associated with the notification",
                    "required": true
                }
            ],
            "responses": {
                "201": {
                    "description": "Notification created",
                },
            }
        },
    },
    "/notifications/{notificationId}": {
        "parameters": [
            {
                "name": "notificationId",
                "in": "path",
                "schema": {
                    "type": "integer"
                },
                "required": true,
                "description": "notification Id of the individual notification"
            }
        ],
        "put": {
            "description": "Updates a notification's viewed status.",
            "tags": ["notifications"],
            "responses": {
                "200": {
                    "description": "Notification marked as viewed",
                },
            }
        },
    }
}