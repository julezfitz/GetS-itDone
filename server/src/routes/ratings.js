const router = require("express").Router();

module.exports = db => {

    router.get("/ratings", (request, response) => {
        const { rateeId } = request.query;
        let queryString = `SELECT user_ratings.ratee_id, user_ratings.rating, user_ratings.comment, 
        user_ratings.date, users.id AS raterId, users.first_name, users.last_name FROM user_ratings
        JOIN users ON user_ratings.rater_id = users.id
        WHERE ratee_id = ${rateeId};`

        db.query(queryString).then(({ rows: ratings }) => {
            let ratingsArray = [];

            ratings.forEach((ratingObj) => {
                ratingsArray.push(
                    {
                        "rater": {
                            "raterid": ratingObj.raterid,
                            "firstName": ratingObj.first_name,
                            "lastName": ratingObj.last_name,
                        },
                        "rateeId": ratingObj.ratee_id,
                        "rating": ratingObj.rating,
                        "comment": ratingObj.comment,
                        "date": ratingObj.date
                    }
                )
            });

            response.json(ratingsArray);
        });
    });

    router.post("/ratings", (request, response) => {
        const { raterId, rateeId, listingId, rating, comment } = request.body;
        let numRating = parseInt(rating);

        db.query(
            `INSERT INTO user_ratings (rater_id, ratee_id, listing_id, rating, comment) 
                VALUES ($1::integer, $2::integer, $3::integer, $4::integer, $5::text) RETURNING *;`,
            [raterId, rateeId, listingId, numRating, comment]
        ).then(({rows}) => {            
            let postedRating = {
                "raterId": rows[0].rater_id, 
                "rateeId": rows[0].ratee_id, 
                "listingId": rows[0].listing_id, 
                "rating": rows[0].rating, 
                "comment": rows[0].comment,
                "date": rows[0].date
            }
            
            response.json(postedRating);
        });
    });

    return router;
}


// API documentation for Open API below

module.exports.apiDocs = {
    "/ratings": {
        "get": {
            "description": "Return all ratings about an individual user from the system.",
            "tags": ["ratings"],
            "parameters": [{
                "name": "rateeId",
                "in": "query",
                "description": "get ratings for a user",
                "required": true
            }],
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
                                    "comment": "John was great to work with! Highly recommend",
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
                                    "comment": "John was awesome",
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
                            "comment": "John was great to work with! Highly recommend"
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
                                "comment": "John was great to work with! Highly recommend",
                                "date": "2022-02-01 05:01:37 -5:00"
                            }
                        }
                    }
                },
            }
        }
    }
}