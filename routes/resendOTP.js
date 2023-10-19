const sendRegistrationEmail = require('./send_mail');
const generate_OTP = require('./otp_algo');
const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

route.get('/', (req, res) => {
   const email = req.query.email;
   const otp_code = generate_OTP(6);

   // console.log(email);

   const select_from_email = `SELECT OTP FROM TEMP_PRESCRIBER WHERE EMAIL = '${email}'`;
   const update_otp = `UPDATE TEMP_PRESCRIBER SET OTP = '${otp_code}' WHERE EMAIL = '${email}'`;
   
   sql_conn.query(update_otp, async function (err) {
      if (err) throw err;
      // console.log(otp_code);
      sendRegistrationEmail (email, otp_code)
      .then(result => res.json({success : result.success}))
      .catch(error => console.error(error));
   });

   sql_conn.query(select_from_email, async (err, otp) => {
    if (err) throw err;
   //  console.log(otp);
   console.log("OTP for " + req.query.email + " is updated " + otp_code);
   });

});

module.exports = route;
