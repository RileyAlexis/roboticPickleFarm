const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const verifyToken = require('../modules/jwtMiddleware');

const jwtkey = process.env.SECRET_KEY;

router.post('/login', (req, res) => {
    console.log('login route call');
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
                const token = jwt.sign(user, jwtkey, {expiresIn: '3hr' }); 
                res.json({ userId: userId, email: email, token: token });
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

    let queryString = `INSERT INTO "users" ("email", "hashed_password", "role") VALUES($1, $2, $3)
                        RETURNING "id";`;

    pool.query(queryString, [email, hashedPassword, 'user'])
        .then((result) => {
            // console.log('New User Id:', result.rows[0].id); //ID IS HERE!
            //provess.env.secret created in node terminal : 
            //node -> require('crypto').randomBytes(64).toString('hex');
            //require(‘dotenv’).config();
            const user = {
                id: result.rows[0].id,
                email: req.body.email
            }
            const token = jwt.sign(user, jwtkey, {expiresIn: '3hr' }); 
            res.json({ email: email, token: token });
        })
        .catch((error) => {
            res.json({ detail: 'Signup Failed' });
            console.log(error);
        })
})

router.post('/testingRoute', verifyToken, (req, res) => {
    console.log('Headers',req.headers);
    console.log('Req.body', req.body);
    const token = req.body.headers.Authorization;
    console.log('Req.user', req.user);
    console.log('Token', token);
    res.send('Testing Route Response');
    // const isVerified = verifyToken(req.body);
    // console.log('Is Verified', isVerified);

})



router.post('/savenewgame', verifyToken, (req, res) => {
    let queryString = `INSERT INTO "games" ("game_id", "resources", "prices", "pickerBots", 
    "planterBots", "picklerBots", "upgrades", "cycle", "gameSpeed", "log")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;


    const userEmail = req.body.userEmail;
    const userId = req.body.userId;
    const cycles = req.body.cycles;
    const resources = req.body.resources;
    const prices = req.body.prices;
    const log = req.body.log;
    const plants = req.body.plants;
    const pickerBots = req.body.pickerBots;
    const planterBots = req.body.planterBots;
    const picklerBots = req.body.picklerBots;
    const upgrades = req.body.upgrades;
    const gameSpeed = 1000;

    pool.query(queryString, [userId, resources, prices, pickerBots, planterBots, picklerBots, upgrades, cycles, gameSpeed, log])
        .then((response) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.error(`Error making query ${queryString}`, error);
            res.sendStatus(500);
        })
})

router.post('/savegame', verifyToken, (req, res) => {

let dataArr = [
    req.body.dataObj.userId,
    JSON.stringify(req.body.dataObj.plants),
    req.body.dataObj.resources,
    req.body.dataObj.stats,
    req.body.dataObj.robots,
    req.body.dataObj.plantSettings,
    req.body.dataObj.prices,
    {Placeholder: 'buildings'},
    req.body.dataObj.upgrades,
    req.body.dataObj.log
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
                    "plantSettings" = $6,
                    "prices" = $7,
                    "buildings" = $8,
                    "upgrades" = $9,
                    "log" = $10
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
                    "plantSettings", 
                    "prices", 
                    "buildings", 
                    "upgrades", 
                    "log")
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

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


})

module.exports = router;
