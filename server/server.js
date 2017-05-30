// dependencies
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const GithubStrategy = require('passport-github');

// config
const config = require('./config');

// connect to DB and user model
mongoose.connect(config.MONGO_URL);
const User = require('./api/user/userModel');

// routes require
const apiRoute = require('./api/');

// passport
passport.use(new GithubStrategy(config.githubAuth, (accessToken, refreshToken, profile, callback) => {
    User.findOne({ github_id: profile.id }, (err, user) => {
        if (err) return callback(err, user);

        if(!user) {
            let user = {
                github_id: profile.id,
                username: profile.username,
                avatar_url: profile._json.avatar_url,
                email: profile._json.email
            }

            User.create(user, (err, user) => {
                req.token = accessToken;
                return callback(err, user);
            });
        } else {
            return callback(err, user);
        }
    });
}));

// middlewares
require('./middleware/')(app);

// routes
app.use('/api', apiRoute);
app.get('/auth', passport.authenticate('github'));

app.get('/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
    // console.log(req.user);
    // console.log(req);
    res.json({ str: req });
});

// main route
app.get('/', (req, res) => {
    console.log(req.user);
    console.log('main route');
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 300).send(err);
});

// listening
app.listen(config.PORT, () => { console.log(`Server is listening on port ${config.PORT}` ); });
