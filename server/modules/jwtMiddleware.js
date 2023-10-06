const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

function verifyToken(req, res, next) {
    const token = req.body.headers.Authorization;
    const jwtkey = process.env.SECRET_KEY;

    if (!token) {
        return res.status(403).send('Access Denied');
    }

    jwt.verify(token, jwtkey, (err, user) => {
        if (err) {
            return res.status(401).send('Invalid Token');
        }
        req.user = user;
        next();

    });
}

module.exports = verifyToken;