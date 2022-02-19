# GetS*itDone

An app to view and post once-off odd job listings. Need your lawn mowed, gutters cleaned, help moving? This app is for you! Post details of a job you need done, photos and a price you are willing to pay. View and manage your personal listings. Accept or decline offers and connect with successful applicants. Search for, view and offer to do jobs that need doing in your area. 

This project was built by Julie Fitzpatrick, Matt Parisien and Brad Sawyer using React, PostgreSQL, Material UI and OpenAPI. 

This site has been deployed - Visit: https://priceless-ptolemy-ba407f.netlify.app/

## Views

### Home

### Registration

### Search

### Listing Details

### Reviews

### Create Listing

### My Profile

### My Listings

### My Offers


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