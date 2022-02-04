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