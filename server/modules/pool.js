const pg = require('pg');

let pool;
console.log(process.env.DATABASE_URL);
if (process.env.NODE_ENV === 'production') {
    pool = new pg.Pool({
        user: process.env.PGUSER,
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