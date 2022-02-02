const router = require("express").Router();

module.exports = db => {

  router.get("/listings", (request, response) => {
    db.query(`SELECT * FROM listings`).then(({ rows: listings }) => {
      response.json(
        listings.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  return router;
};
