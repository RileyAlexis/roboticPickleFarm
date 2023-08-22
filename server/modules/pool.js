const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'robotic_pickle_farm', 
});

module.exports = pool;