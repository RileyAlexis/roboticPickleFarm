const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const verifyToken = require('../modules/jwtMiddleware');


const jwtkey = process.env.SECRET_KEY;

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let userRole = '';
    let userId = '';

    const queryString = `SELECT * FROM "users" WHERE "email" ILIKE $1`;
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
                userRole = response.rows[0].role;
                userId = response.rows[0].id;

                return passwordsMatch = bcrypt.compare(password, hashedPassword);
            }
        })
        .then((passwordsMatch) => {
            if (!passwordsMatch) {
                res.json({ detail: 'Invalid Credentials' });
            } else if (passwordsMatch) {
                const user = {
                    id: userId,
                    email: email
                }
                const token = jwt.sign(user, jwtkey, { expiresIn: '3hr' });
                res.json({ userId: userId, email: email, token: token });
            }
        })
        .catch((error) => {
            console.error(error);
        })
}) //End Login

router.post('/newUser', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    let queryString = `INSERT INTO "users" ("email", "hashed_password", "role") VALUES($1, $2, $3)
                        RETURNING "id";`;

    pool.query(queryString, [email, hashedPassword, 'user'])
        .then((result) => {
            const user = {
                id: result.rows[0].id,
                email: req.body.email
            }
            const token = jwt.sign(user, jwtkey, { expiresIn: '3hr' });
            res.json({ userId: result.rows[0].id, email: email, token: token });
        })
        .catch((error) => {
            res.json({ detail: 'Signup Failed' });
            console.log(error);
        })
}) //End create new user

router.post('/savegame', verifyToken, (req, res) => {
    let dataArr = [
        req.body.dataObj.userId,
        JSON.stringify(req.body.dataObj.plants).replace(/\s/g, ''),
        req.body.dataObj.resources,
        req.body.dataObj.stats,
        req.body.dataObj.robots,
        req.body.dataObj.prices,
        JSON.stringify(req.body.dataObj.buildings),
        JSON.stringify(req.body.dataObj.upgrades),
        JSON.stringify(req.body.dataObj.log)
    ];

    let queryString = 'SELECT 1 FROM "games" WHERE "user_id" = $1'
    pool.query(queryString, [req.body.dataObj.userId])
        .then((result) => {
            if (result.rows.length > 0) {
                //ID Exists write update SQL stuff here
                queryString = `
                UPDATE "games"
                SET "plants" = $2,
                    "resources" = $3,
                    "stats" = $4,
                    "robots" = $5,
                    "prices" = $6,
                    "buildings" = $7,
                    "upgrades" = $8,
                    "log" = $9
                WHERE "user_id" = $1;`
            } else {
                //ID does not exist - write INSERT sql code here
                queryString = `
                INSERT INTO "games" 
                    ("user_id", 
                    "plants", 
                    "resources", 
                    "stats", 
                    "robots", 
                    "prices", 
                    "buildings", 
                    "upgrades", 
                    "log")
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

            } //End userId if exists statement
            pool.query(queryString, dataArr)
                .then((response) => {
                    res.sendStatus(200);
                }).catch((error) => {
                    console.log(error);
                    res.sendStatus(500);
                })

        }).catch((error) => {
            console.error(error);
        })
}) //End Save Game


router.post('/loadgame', verifyToken, (req, res) => {
    let userId = req.body.data.userId;
    let queryString = `SELECT * FROM "games" WHERE "user_id" = $1`
    pool.query(queryString, [userId])
        .then((result) => {

            let data = {
                plants: result.rows[0].plants,
                resources: result.rows[0].resources,
                stats: result.rows[0].stats,
                robots: result.rows[0].robots,
                prices: result.rows[0].prices,
                buildings: result.rows[0].buildings,
                upgrades: result.rows[0].upgrades,
                log: result.rows[0].log,
            }

            res.json(data);

        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })

})

router.post('/deleteGame', verifyToken, (req, res) => {
    let userId = req.body.dataObj.userId;
    let queryString = `DELETE FROM "games" WHERE "user_id" = $1;`;

    pool.query(queryString, [userId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
})

module.exports = router;
