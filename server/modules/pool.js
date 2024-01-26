const pg = require('pg');

let pool;
if (process.env.NODE_ENV === 'production') {
    console.log('Nginx Node env', process.env.NODE_ENV);
    console.log('PG', process.env.PGUSER);
    console.log('PG', typeof process.env.PG_PASSWORD, process.env.PG_PASSWORD);

    pool = new pg.Pool({
        user: process.env.PGUSER,
        password: process.env.PG_PASSWORD,
        host: 'localhost',
        port: 5432,
        database: 'robotic_pickle_farm',
    })


} else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'robotic_pickle_farm',
    });
}

module.exports = pool;