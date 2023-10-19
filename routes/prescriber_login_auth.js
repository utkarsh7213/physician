const express = require('express');
const sql_conn = require('../db');
const bcrypt = require('bcrypt');
const route = express.Router();
const app = express();

route.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const precsriber_data = `SELECT * FROM REGISTERED_PRESCRIBER WHERE EMAIL = ?`;

    sql_conn.query(precsriber_data, [email, password], function (err, result) {
        if (err) {
            console.log("Error");
            throw err;
        }

        if(result.length === 0) {
            res.json({
                wrong: "Email or password is incorrect"
            });
            // res.send("No user found");
        }

        else {
            const hash = result[0].PASSWORD;
            bcrypt.compare(password, hash, function (hash_err, isRight) {
                if (hash_err) throw hash_err;
                if (isRight) {
                    req.session.prescriberID = result[0].ID;
                    req.session.loggedIn = true;
                    res.redirect('/');
                }
                else {
                    res.json({
                        wrong : "Email or password is incorrect"
                    });
                    // res.send("Username or password is incorrect");
                }
            });
        }
    });
});

module.exports = route;
