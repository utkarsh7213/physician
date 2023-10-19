
require('dotenv').config();
const sql_conn = require('../db');
const Forgot_password_otp = require('./forgot_send_email');
const generate_OTP = require('./otp_algo');
const express = require('express');
const route = express.Router();

route.get('/', async (req, res) => {

    const otp_code = generate_OTP(6);
    const update_otp = `UPDATE REGISTERED_PRESCRIBER SET OTP = '${otp_code}' WHERE EMAIL = '${req.query.email}'`;

    // Forgot_password_otp(req.query.email, otp_code);

    // const response = await Forgot_password_otp(req.query.email, otp_code);

    Forgot_password_otp(req.query.email, otp_code)
        .then(result => res.json({success : result.success}))
        .catch(error => console.error(error));

    sql_conn.query(update_otp, (err) => {
        if (err) throw err;
        else {
            console.log("Password for " + req.query.email + " is updated " + otp_code);
        }
    });
    // console.log("OTP " + otp_code);
    // res.json("OTP Sent");
})

module.exports = route;