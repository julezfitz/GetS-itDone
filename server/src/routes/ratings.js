// API documentation for Open API below

module.exports.apiDocs = {
    "/ratings": {
        "get": {
            "description": "Return all ratings about an individual user from the system.",
            "tags": ["ratings"],
            "parameters": {
                "userParam": {
                    "name": "ratee Id",
                    "in": "query",
                    "description": "get ratings for a user",
                    "required": true
                },
            },
            "responses": {
                "200": {
                    "description": "An array of ratings.",
                    "content": {
                        "application/json": {
                            "schema": {},
                            "example": [
                               {
                                    "rater": {
                                        "id": 1,
                                        "firstName": "Paul",
                                        "lastName": "People" 
                                    },
                                    "rateeId": 2,
                                    "rating": 4, 
                                    "comments": "John was great to work with! Highly recommend", 
                                    "date": "2022-03-01 05:01:37 -5:00"
                                },
                                {
                                    "rater": {
                                        "id": 3,
                                        "firstName": "Judy",
                                        "lastName": "Lee" 
                                    },
                                    "rateeId": 2,
                                    "rating": 5, 
                                    "comments": "John was awesome", 
                                    "date": "2022-02-01 05:01:37 -5:00"
                                },
                            ]
                        }
                    }
                }
            }
        },
        "post": {
            "description": "Rate a user",
            "tags": ["ratings"],
            "requestBody": {
                "description": "user model",
                "content": {
                    "application/json": {
                        "schema": {},
                        "example": {
                            "raterId": 1,
                            "rateeId": 2,
                            "listingId": 2,
                            "rating": 4, 
                            "comments": "John was great to work with! Highly recommend"
                        }    
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Rating Created",
                    "content": {
                        "application/json": {
                            "schema": {},
                            "example": {
                                "raterId": 1,
                                "rateeId": 2,
                                "listingId": 2,
                                "rating": 4, 
                                "comments": "John was great to work with! Highly recommend",
                                "date": "2022-02-01 05:01:37 -5:00"
                            }
                         }
                    }
                },
            }
        }
    }
}