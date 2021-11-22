const express = require('express');
const app = express();
const taxiRoutes = require('./taxi-trips');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/taxiTrips';

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



