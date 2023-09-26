const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const jwtkey = '27a0f208255909db32ddf82acef0d742b30f7bd3088d457f3d441ac075aa7b939e92187f2ddfa8e0a9a0472999e0a715568b992720663d5a28a8ee382546895a';

router.post('/login', (req, res) => {
    console.log('login route call');
    const email = req.body.email;
    const password = req.body.password;
    let userRole = '';

    const queryString = `SELECT * FROM users WHERE email ILIKE $1`; 
    //Searches for existing email. Since usernames must be unique the database 
    //will only return 1 or 0 users

    pool.query(queryString, [email])
        .then((response) => {
            //if response.rows.length is 0 the user does not exist
            if (response.rows.length === 0) {
                res.json({ detail: 'User does not exist' });
            //if response.rows.length is 1 the user exists
            } else if (response.rows.length === 1) {
                //Compares user entered password to stored hash and returns true/false
                const hashedPassword = response.rows[0].hashed_password;
                const userRole = response.rows.role;
                return passwordsMatch = bcrypt.compare(password, hashedPassword);
            }
        })
        .then((passwordsMatch) => {
            console.log('Password matches', passwordsMatch);
            if (!passwordsMatch) {
                res.json({ detail: 'Invalid Credentials' });
            } else if (passwordsMatch) {
                const token = jwt.sign({ email }, jwtkey, { expiresIn: '1hr' });
                res.json({ 'email': email, 'token': token, 'role': userRole });
            }
        })
        .catch((error) => {
            console.error(error);
        })
})

router.post('/newUser', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    let queryString = `INSERT INTO "users" ("email", "hashed_password", "role") VALUES($1, $2, $3);`;

    pool.query(queryString, [email, hashedPassword, 'user'])
        .then((result) => {
            //provess.env.secret created in node terminal : 
            //node -> require('crypto').randomBytes(64).toString('hex');
            //require(‘dotenv’).config();
            const token = jwt.sign({ email }, jwtkey, { expiresIn: '1hr' });
            res.json({ 'email': email, 'token': token });
        })
        .catch((error) => {
            res.json({ detail: 'Signup Failed' });
            console.log(error);

        })
    
    
})


module.exports = router;
