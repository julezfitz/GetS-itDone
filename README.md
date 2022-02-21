# GetS*itDone

An app to view and post once-off odd job listings. Need your lawn mowed, gutters cleaned, help moving? This app is for you! Post details of a job you need done, photos and a price you are willing to pay. View and manage your personal listings. Accept or decline offers and connect with successful applicants. Search for, view and offer to do jobs that need doing in your area. 

This project was built by Julie Fitzpatrick, Matt Parisien and Brad Sawyer using React, PostgreSQL, Material UI and OpenAPI. 

This site has been deployed - Visit: https://priceless-ptolemy-ba407f.netlify.app/

## Views

### Home
<!-- !["Home View"](https://github.com/julezfitz/LHL-Final/blob/main/app-imgs/home.jpg?raw=true) -->
<img alt="Home View" src="https://github.com/julezfitz/LHL-Final/blob/main/app-imgs/home.jpg?raw=true" width="150">


### Registration
!["Registration Form"](https://github.com/julezfitz/LHL-Final/blob/main/app-imgs/register.jpg?raw=true)

### Search
!["Search"](https://github.com/julezfitz/LHL-Final/blob/main/app-imgs/search.jpg?raw=true)

### Listing Details
!["Listing Details"](https://github.com/julezfitz/LHL-Final/blob/main/app-imgs/listing-details.jpg?raw=true)

### Reviews
!["Reviews"](https://github.com/julezfitz/LHL-Final/blob/main/app-imgs/ratings.jpg?raw=true)

### Create Listing
!["Create Listing"](https://github.com/julezfitz/LHL-Final/blob/main/app-imgs/new-listing.jpg?raw=true)

### My Profile
!["Profile"](https://github.com/julezfitz/LHL-Final/blob/main/app-imgs/my-profile.jpg?raw=true)

### My Listings
!["My Listings"](https://github.com/julezfitz/LHL-Final/blob/main/app-imgs/my-listings.jpg?raw=true)

### My Offers
!["My Offers"](https://github.com/julezfitz/LHL-Final/blob/main/app-imgs/my-offers.jpg?raw=true)


## Server Side Setup

From the Server directory, install dependencies with `npm install`.

### Create Database

Create the database using the directions below:
echo "CREATE DATABASE getsitdone;" | psql -U development

postgres://development@localhost/getsitdone

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=getsitdone
PGPASSWORD=development
PGPORT=5432
```

To reset and seed the database:
echo "npm run reset"

### API Documentation

echo "npm start" and go to http://localhost:8001/api-docs/#/

## Client Side Setup

From the Client directory, install dependencies with `npm install`.
echo "npm start" and go to http://localhost:3000/

Explore and have fun!
