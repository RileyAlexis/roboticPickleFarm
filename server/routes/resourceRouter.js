const express = require('express');
const router = express.Router();
// const pool = require('../modules/pool.js');

const resources = require('../modules/testData.js')

router.get('/', (req, res) => {
    res.send(resources);
    console.log(resources);
})

module.exports = router;