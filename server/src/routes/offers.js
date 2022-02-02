// API documentation for Open API below

module.exports.apiDocs = {
    "/offers": {
        "get": {
            "description": "Return all applications by an individual user from the system.",
            "parameters": {
                "applicantParam": {
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
        "post": {
            "description": "Creates an offer to do a job.",
            "requestBodies": {
                "description": "application model",
                "content": {
                    "application/json": {
                        "schema": {},
                        "examples": {
                            "individualApplication": {
                                "listingId": 1,
                                "applicantId": 2,
                            }
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
        "delete": {
            "description": "Delete an offer to do a job",
            "parameters": {
                "applicantParam": {
                    "name": "applicant Id",
                    "in": "query",
                    "description": "delete offer for a listing by the applicant",
                    "required": true
                },
            },
            "responses": {
                204: {
                    description: "Offer retracted",
                },
            }, 
        }
    }
}