const express = require('express');
const app = express();
const resourceRouter = require('./routes/resourceRouter.js');
const gameRouter = require('./routes/gameRouter.js');
const PORT = process.env.PORT || 5001;

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/resources/', resourceRouter);
app.use('/game/', gameRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});