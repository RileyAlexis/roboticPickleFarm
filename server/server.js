const express = require('express');
const app = express();

const resourceRouter = require('./routes/resourceRouter.js');
const gameRouter = require('./routes/gameRouter.js');
// const userRouter = require('./routes/userRouter');

const PORT = process.env.PORT || 5001;


/** ---------- MIDDLEWARE ---------- **/
// const sessionMiddleware = require('./modules/sessionMiddleware');
// const passport = require('./strategies/user.strategy');

app.use(express.json({limit: '50mb' })); // needed for axios requests
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/resources/', resourceRouter);
app.use('/game/', gameRouter);
// app.use('/user', userRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});