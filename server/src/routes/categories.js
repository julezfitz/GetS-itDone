// API documentation for Open API below

module.exports.apiDocs = {
    "/categories": {
        "get": {
            "description": "Return all categories.",
            "tags": ["categories"],
            "responses": {
                "200": {
                    "description": "An array of categories.",
                    "content": {
                        "application/json": {
                            "schema": {},
                            "example": [
                               {
                                    "categoryId": 1,
                                    "categoryName": "Home Improvement" 
                                },
                                {
                                    "categoryId": 2,
                                    "categoryName": "Painting" 
                                },
                            ]
                        }
                    }
                }
            }
        }
     
    }
}