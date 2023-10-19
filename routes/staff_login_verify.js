const sql_conn = require('../db');
const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');

route.post('/', (req, res) => {
    // console.log(req.body.prescriberemail); 
    // console.log(req.body.staffemail); 
    // console.log(req.body.password); 
    const physician = `SELECT * FROM REGISTERED_PRESCRIBER WHERE ID = '${req.session.prescriberID}'`;
    const select_staff_email_pass = `SELECT EMAIL, PASSWORD, ID FROM STAFF WHERE EMAIL = '${req.body.staffemail}'`; 

sql_conn.query(physician, (err, physician_result) => {
    if(err) {
        console.log("Physisican's Email not found");
        throw err;
    }

    const physician_mail = physician_result[0].EMAIL;

    if(physician_mail.length > 0) {
        sql_conn.query(select_staff_email_pass, (err, staff_res) => {
            if (err) {
                console.log("Error in Querying staff from the database");
                return;
            }

            if(staff_res.length > 0) {
                // console.log(staff_res);
            const hash = staff_res[0].PASSWORD;
                bcrypt.compare(req.body.password, hash, function (hash_err, isRight) {
                    if (hash_err) throw hash_err;
                    if (isRight) {
                        req.session.staffID = staff_res[0].ID;
                        req.session.staffloggedIn = true;
                        res.redirect('/staff');
                    }
                    else {
                        res.send("Email or password is incorrect");
                    }
                });
            }
            else {
                res.status(404).send("Email or password is incorrect");
            }
        
        });
    }
    else {
        res.status(404).send("No Physician's Email found");
    }
});

});

module.exports = route;