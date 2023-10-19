const express = require('express');
const sql_conn = require('../db');
const route = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const generate_OTP = require('./otp_algo');
const sendRegistrationEmail = require('./send_mail');
const upload = multer();

async function checkRegisteredData(contact, email) {
    return new Promise((resolve, reject) => {
        const check_query = "SELECT * FROM REGISTERED_PRESCRIBER WHERE CONTACT = ? OR EMAIL = ?";

        sql_conn.query(check_query, [contact, email], (check_err, check_results) => {
            if (check_err) {
                reject(check_err);
            } else {
                const alreadyExists = check_results.length > 0;
                resolve(alreadyExists);
            }
        });
    });
}

async function checkTempRegisteredData(contact, email) {
    return new Promise((resolve, reject) => {
        const check_query = "SELECT * FROM TEMP_PRESCRIBER WHERE CONTACT = ? OR EMAIL = ?";

        sql_conn.query(check_query, [contact, email], (check_err, check_results) => {
            if (check_err) {
                reject(check_err);
            } else {
                const alreadyExists = check_results.length > 0;
                resolve(alreadyExists);
            }
        });
    });
}

route.post('/', upload.any(), async (req, res) => {
    const data = req.body;

    if (data.password !== data.password_confirmation) {
        return res.send("Passwords do not match");
    }

    const contact = req.body.contact;
    const email = req.body.email;

    try {
        const existsRegistered = await checkRegisteredData(contact, email);
        const existsTempRegistered = await checkTempRegisteredData(contact, email);

        if (existsTempRegistered) {
            console.log("Email or Phone already registered in TEMP_PRESCRIBER: " + email + " " + contact);
            // Send the contact information to the developer
            // Replace the following line with your desired action (e.g., sending an email to the developer)
            return res.send("Pending account verification! Please contact developer");
        } else if (existsRegistered) {
            console.log("Email or Phone already registered in REGISTERED_PRESCRIBER: " + email + " " + contact);
            return res.send("Email or phone already registered");
        } else {
            const otp_code = generate_OTP(6);
            sendRegistrationEmail (email, otp_code)
            .then(result => console.log(result.success))
            .catch(error => console.error(error));

            const store_temp_data = `INSERT INTO TEMP_PRESCRIBER(FIRST_NAME, LAST_NAME, EMAIL, CONTACT, CREDITIONALS, PRACTICE_NAME, ADDRESS1, ADDRESS2, PRACTICE_CITY, PRACTICE_STATE, ZIP_CODE, NPI, LICENSE_STATE, LICENSE_NUMBER, PASSWORD, PUBLIC_EMAIL, PUBLIC_PHONE, OTP) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);

            const result = await sql_conn.query(store_temp_data, [data.first_name, data.last_name, email, contact, data.credentials, data.practice_name, data.address_1,
                data.address_2, data.city, data.practice_state, data.zip_code, data.npi, data.license_state, data.license_number, hash, data.public_email, data.public_phone, otp_code]);

            if (result.error) {
                throw result.error;
            } else {
                return res.redirect('/otpValidation?email=' + encodeURIComponent(email));
            }
        }
    } catch (error) {
        return res.send("An error occurred. Try again later: " + error);
    }
});

module.exports = route;
