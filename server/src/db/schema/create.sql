DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS listing_categories CASCADE;
DROP TABLE IF EXISTS offers CASCADE;
DROP TABLE IF EXISTS user_ratings CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS user_notifications CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  image VARCHAR(255)
);
ALTER SEQUENCE users_id_seq RESTART WITH 1000;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category VARCHAR(255) NOT NULL
);

CREATE TABLE listings (
    id SERIAL PRIMARY KEY NOT NULL,
    creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    image_1 VARCHAR(255),
    image_2 VARCHAR(255),
    image_3 VARCHAR(255),
    price NUMERIC NOT NULL,
    city VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL default now()
);
ALTER SEQUENCE listings_id_seq RESTART WITH 1000;

CREATE TABLE listing_categories (
    id SERIAL PRIMARY KEY NOT NULL,
    listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
ALTER SEQUENCE listing_categories_id_seq RESTART WITH 1000;

CREATE TABLE offers (
    id SERIAL PRIMARY KEY NOT NULL,
    listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
    bidder_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    accepted BOOLEAN NOT NULL DEFAULT FALSE,
    pending BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE user_ratings (
    id SERIAL PRIMARY KEY NOT NULL,
    listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
    rater_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    ratee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating NUMERIC NOT NULL,
    comment TEXT,
    created TIMESTAMP NOT NULL default now()
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY NOT NULL,
    notification_message VARCHAR(255) NOT NULL
);

CREATE TABLE user_notifications (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    offer_id INTEGER REFERENCES offers(id) ON DELETE CASCADE,
    notification_id INTEGER REFERENCES notifications(id) ON DELETE CASCADE, 
    created TIMESTAMP NOT NULL default now(),
    viewed BOOLEAN NOT NULL DEFAULT FALSE
);
