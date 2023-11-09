const dotenv = require('dotenv').config();
const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.HOST_NAME,
    port: 5432,
    database: process.env.RENDER_DB, 
});

module.exports = pool;