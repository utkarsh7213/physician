const sql_conn = require('../db');
const express = require('express');
const Forgot_password_otp = require('./forgot_send_email')
const generate_OTP = require('./otp_algo');
const route = express.Router();

route.post('/', (req, res) => {

    console.log(req.body.email);

    sql_conn.query("SELECT EMAIL FROM REGISTERED_PRESCRIBER WHERE EMAIL = ?", [req.body.email], async (err, email_exists) => {
        if(err) {
            console.log('Error in checking email');
            return;
        }
        if(email_exists.length > 0) {
            const otp_code = generate_OTP(6);
            const update_otp = `UPDATE REGISTERED_PRESCRIBER SET OTP = '${otp_code}' WHERE EMAIL = '${req.body.email}'`;
            
                Forgot_password_otp(req.body.email, otp_code)
                .then(result => console.log(result.success))
                .catch(error => console.error(error));
        
            sql_conn.query(update_otp, (err) => {
                if(err) throw err;
                else {
                    console.log("Password for " + req.body.email + " is updated OTP is " + otp_code);

                    // res.send('updated')
                    res.render('forgot_password_otp', {
                        email : req.body.email, 
                    });
                }
            });
            
        }
        else {
            res.send('Email not found');
        }
    })

});

module.exports = route;
