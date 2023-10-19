const express = require('express');
const sql_conn = require('../db');
const route = express.Router();
const bcrypt = require('bcrypt');

function RandomDigits(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      result += randomDigit;
    }
    return result;
  }

const insert_staff_data = `INSERT INTO STAFF(ID, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, UTC) VALUES(?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`;
const check_staff_reg = `SELECT * FROM STAFF WHERE EMAIL = ?`;

route.post('/upload_staff', (req, res) => {
    const {
        first_name, last_name, email, password
    } = req.body;


    sql_conn.query(check_staff_reg, [email], (err, staff_res) => {
        if (err) throw err;
        if (staff_res.length > 0) {
            res.status(404).send("Staff already registered with " + email);
        }
        else {
            bcrypt.genSalt(10, async function (err, salt) {
                if(err) throw err;
                await bcrypt.hash(password, salt, async function (err, hash) {
                    if(err) {
                        // console.log("Error in hashing password");
                        throw err;
                    }
        
              const staff_id = RandomDigits(6);
            //   console.log('Staff id : ', staff_id);
                
                    await sql_conn.query(insert_staff_data, [staff_id, first_name, last_name, email, hash], (err) => {
                        if(err) throw err;
                        else {
                            res.redirect('/staff');
                        }
                    });
        
                });
            });
        }
    })



});

module.exports = route;
