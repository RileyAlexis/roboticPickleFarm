const pg = require('pg');

let pool;
console.log(process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }) 
} else {
    pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'robotic_pickle_farm', 
});
}

module.exports = pool;