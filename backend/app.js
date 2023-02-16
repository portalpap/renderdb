//backend app.js
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//----------------------------------------- END OF IMPORTS---------------------------------------------------
const app = express();
const db = require('./db');
const { response } = require('express');

const port = process.env.PORT || 4000;
const reactClientURL = 'http://localhost:3000'; // react client

// Middleware
app.use(express.static('../client/dist'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: reactClientURL, // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(
    session({
        secret: 'secretcode-pg',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(cookieParser('secretcode-pg'));
app.use(passport.initialize());
app.use(passport.session());
require('./auth/passportConfig')(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

app.get('/', (req, res) => {
    res.send('hello');
});
app.get('/getAllUsers', db.getUsers);

app.post(
    '/login',
    passport.authenticate('local', {
        failureMessage: 'get a life sucker',
        failureRedirect: '/'
    }),
    (req, res) => {
        res.send('Authorized');
    }
);

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
