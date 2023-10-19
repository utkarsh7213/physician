const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

function generateRandomNumber(length) {
    let result = '';
    const digits = '0123456789';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        result = result + digits.charAt(randomIndex);
    }
    return result;
}

function checkRandomIdExists(randomId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS count FROM REGISTERED_PRESCRIBER WHERE id = ?';
        sql_conn.query(query, [randomId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const count = results[0].count;
                resolve(count > 0);
            }
        });
    });
}

async function generateUniqueRandomId(length) {
    let randomId;
    let exists;

    do {
        randomId = generateRandomNumber(length);
        exists = await checkRandomIdExists(randomId);
    } while (exists);

    return randomId;
}

route.post('/', (req, res) => {
    const otp = req.body.otp;
    const email = req.body.email;

// const select_temp_data =`SELECT OTP FROM TEMP_PRESCRIBER WHERE EMAIL = '${email}'`;
const select_temp_data =`SELECT OTP FROM TEMP_PRESCRIBER WHERE EMAIL = '${email}'`;

    if (otp.length < 6) {
        res.json({otp_error : "Wrong OTP"});
        // res.send(otp_error);
    }
    else {
        sql_conn.query(select_temp_data, (err, otp_res) => {
            if (err) throw err;
            if (otp == otp_res[0].OTP) {
                // console.log(otp);
                const select_from_temp = `SELECT * FROM TEMP_PRESCRIBER WHERE EMAIL = '${email}'`;
              
                const register_query = "INSERT INTO REGISTERED_PRESCRIBER(ID, FIRST_NAME, LAST_NAME, EMAIL, CONTACT, CREDITIONALS, PRACTICE_NAME, ADDRESS1, ADDRESS2, PRACTICE_CITY, PRACTICE_STATE, ZIP_CODE, NPI, LICENSE_STATE, LICENSE_NUMBER, PASSWORD, PUBLIC_EMAIL, PUBLIC_PHONE) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                generateUniqueRandomId(5)
                .then((randomId) => {          
                    sql_conn.query(select_from_temp, async (err, temp_data) => {
                        if (err) throw err;
                        const values = [randomId, temp_data[0].FIRST_NAME, temp_data[0].LAST_NAME, temp_data[0].EMAIL, temp_data[0].CONTACT, temp_data[0].CREDITIONALS, temp_data[0].PRACTICE_NAME, temp_data[0].ADDRESS1,
                        temp_data[0].ADDRESS2, temp_data[0].PRACTICE_CITY, temp_data[0].PRACTICE_STATE, temp_data[0].ZIP_CODE, temp_data[0].NPI, temp_data[0].LICENSE_STATE, temp_data[0].LICENSE_NUMBER, temp_data[0].PASSWORD, temp_data[0].PUBLIC_EMAIL, temp_data[0].PUBLIC_PHONE];
                       
                        await sql_conn.query(register_query, values, (err) => {
                            if (err) throw err;
                            else {
                                // console.log(temp_data);
                             
                                sql_conn.query(`DELETE FROM TEMP_PRESCRIBER WHERE EMAIL = '${email}'` , function (err)  {
                                    if (err) throw err;
                                });
                                // const otp_verified = "ACCOUNT VERIFIED";
                                res.json({otp_verified : "Account Verified"});
                            }
                        });
                        
                        });
                
                    })
                    .catch((error) => {
                        console.error('Error in creating user ID:', error);
                    });
                
            }
            else {
                res.json({otp_error : "Wrong OTP"});
            }
        });
    }
});

module.exports = route;
