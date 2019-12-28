const express = require('express')
const app = express.Router();
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');

app.get('/', (req, res) => {
    res.render('welcome')
})

// Dashboard
app.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        user: req.user
    })
);

module.exports = app;