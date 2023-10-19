const sql_conn = require('../db');
const bcrypt = require('bcrypt');
const express = require('express');
const route = express.Router();

route.post('/', (req, res) => {
    const email = req.body.email;
    const new_password = req.body.newPassword;
    const confirm_new_password = req.body.confirmNewPassword;
    
    // sql_conn.query(`UPDATE REGISTERED_PRESCRIBER SET OTP = null WHERE EMAIL = '${email}'`, (err) => {
    //     if (err) throw err;
    // })

    if (new_password.length < 7 || confirm_new_password.length < 7) {
        res.send("Minimum length of password atleast 8");
        return;
    }
    else {
        if (new_password != confirm_new_password) {
            res.send("Wrong Passwords");
            return;
        }
        else {
            async function Update_Password() {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(new_password, salt);
                
                const password_update_query = `UPDATE REGISTERED_PRESCRIBER SET PASSWORD = '${hash}' WHERE EMAIL = '${email}'`;

                await sql_conn.query(password_update_query, async (err) => {
                    if(err) {
                        console.log("Password not Updated");
                        throw err;
                    }
                    else {
                        await res.redirect('/login');
                    }
                })
            }
            Update_Password();
        }
    }
});

module.exports = route;