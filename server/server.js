const express = require('express');
const app = express();

const resourceRouter = require('./routes/resourceRouter.js');
const gameRouter = require('./routes/gameRouter.js');
// const userRouter = require('./routes/userRouter');

const PORT = process.env.PORT || 5001;


/** ---------- MIDDLEWARE ---------- **/
// const sessionMiddleware = require('./modules/sessionMiddleware');
// const passport = require('./strategies/user.strategy');

app.use(express.json()); // needed for axios requests
app.use(express.static('build'));

// Passport Session Configuration //
// app.use(sessionMiddleware);

// start up passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/resources/', resourceRouter);
app.use('/game/', gameRouter);
// app.use('/user', userRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});