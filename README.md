# LHL-Final

## Setup
Install dependencies with `npm install`.

## Create Database
Create the database using the directions below:
echo "CREATE DATABASE getsitdone;" | psql -U development

postgres://development@localhost/getsitdone

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```

To reset the database:
echo "npm run reset"