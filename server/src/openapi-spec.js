module.exports = {
  openapi: "3.0.0",
  info: {
    "title": "GetsItDone API",
    "description": "..."
  },
  "paths": {
    ...(require('./routes/listings').apiDocs),
    ...(require('./routes/users').apiDocs),
    ...(require('./routes/offers').apiDocs),
    ...(require('./routes/ratings').apiDocs),
    ...(require('./routes/categories').apiDocs),
    ...(require('./routes/notifications').apiDocs),
  }
};
