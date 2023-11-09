const dotenv = require('dotenv').config();
const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.RENDER_DB,
    port: 5432,
    database: 'robotic_pickle_farm', 
});

module.exports = pool;