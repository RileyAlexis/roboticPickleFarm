const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const jwtkey = process.env.SECRET_KEY;

router.post('/login', (req, res) => {
    console.log('login route call');
    const email = req.body.email;
    const password = req.body.password;
    console.log(req);
    let userRole = '';
    let userId = '';

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
                userRole = response.rows[0].role;
                userId = response.rows[0].id;

                return passwordsMatch = bcrypt.compare(password, hashedPassword);
            }
        })
        .then((passwordsMatch) => {
            console.log('Password matches', passwordsMatch);
            if (!passwordsMatch) {
                res.json({ detail: 'Invalid Credentials' });
            } else if (passwordsMatch) {
                const token = jwt.sign({ email }, jwtkey, { expiresIn: '1hr' });
                res.json({ 'userId': userId, 'email': email, 'token': token, 'role': userRole });
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

router.post('/savenewgame', (req, res) => {
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

router.post('/savegame', (req, res) => {
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

    let queryString = `UPDATE "games"
                SET "resources" = $2,
                    "prices" = $3,
                    "pickerBots" = $4,
                    "planterBots" = $5,
                    "picklerBots" = $6,
                    "upgrades" = $7,
                    "cycle" = $8,
                    "gameSpeed" = $9,
                    "log" = $10
                WHERE "id" = $1
    `

    pool.query(queryString, [userId, resources, prices, pickerBots, planterBots, picklerBots, upgrades, cycles, gameSpeed, log])
        .then((response) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.error(`Error making query ${queryString}`, error);
            res.sendStatus(500);
        })

})

module.exports = router;
