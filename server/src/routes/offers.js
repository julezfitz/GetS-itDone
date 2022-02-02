// API documentation for Open API below

module.exports.apiDocs = {
    "/offers": {
        "get": {
            "description": "Return all applications by an individual user from the system.",
            "parameters": {
                "userParam": {
                    "name": "applicant Id",
                    "in": "query",
                    "description": "get applications for a user",
                    "required": true
                },
            },
            "responses": {
                "200": {
                    "description": "An array of applications.",
                    "content": {
                        "application/json": {
                            "schema": {},
                            "examples": [
                               {
                                   "listingId": 5,
                                   "title": "Walk my dog",
                                   "price": 50,
                                   "image_1": "https://images.unsplash.com/image_1.jpg"
                                },
                                {
                                    "listingId": 6,
                                    "title": "Feed the cat",
                                    "price": 40,
                                    "image_1": "https://images.unsplash.com/image_2.jpg" 
                                },
                            ]
                        }
                    }
                }
            }
        },
    }
}