const sql_conn = require('../db');
const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {

    const ref_url = req.headers.referer;

    if (ref_url === '' || ref_url === undefined) {
        res.sendStatus(404);
    }
    else if (ref_url === 'http://localhost:8000/forgot_password_mail') {
        const email = req.query.email;
        res.render('forgot_changePassword', {
            email: email
        })
    }
    else {
        res.sendStatus(404);
    }

});

module.exports = route;