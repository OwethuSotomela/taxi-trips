const express = require('express');
const app = express();
const taxiRoutes = require('./taxi-trips');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/travis_ci_test';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const taxiTrips = taxiRoutes(pool)

const PORT = process.env.PORT || 2002
app.listen(PORT, function(){
    console.log("App started at port", PORT)
});



