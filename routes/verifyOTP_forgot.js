const sql_conn = require('../db');
const express = require('express');
const route = express.Router();

route.post('/', (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const select_otp = `SELECT OTP FROM REGISTERED_PRESCRIBER WHERE EMAIL = '${email}'`;

    sql_conn.query(select_otp, (err, otp_res) => {
        if (err) throw err;

        if(otp_res.length > 0) {            
            if(otp === otp_res[0].OTP) {
                // res.json({otp_verified : "Verified"});

                sql_conn.query(`UPDATE REGISTERED_PRESCRIBER SET OTP = null WHERE EMAIL = '${email}'`, (err) => {
                    if (err) throw err;
                })
                    
                res.sendStatus(200);        
            }
            else {
                res.json({otp_error : "Wrong OTP"});
            }

        
        }

    });
    
});

module.exports = route;