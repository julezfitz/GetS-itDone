const router = require("express").Router();

module.exports = db => {

    router.get("/categories", (request, response) => {
        db.query(`SELECT * FROM categories`).then(({ rows: categories }) => {
            response.json(categories);
        });
    });

    return router;
};

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
                            "schema": {
                                "type": "array"
                            },
                            "example": [
                               {
                                    "id": 1,
                                    "category": "Home Improvement" 
                                },
                                {
                                    "id": 2,
                                    "category": "Painting" 
                                },
                            ]
                        }
                    }
                }
            }
        }
     
    }
}