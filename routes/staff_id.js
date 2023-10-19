const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

route.get('/id/:id', (req, res) => {
    if (req.session.staffloggedIn) {
        const id = req.params.id;
    
        const physician_id = req.session.prescriberID;
        let physician_details = `SELECT NPI, FIRST_NAME, LAST_NAME FROM REGISTERED_PRESCRIBER WHERE ID = ?`;

        sql_conn.query(physician_details, [physician_id], async (err, physician_details) => {
            if(err) {
                console.log('Error in retreiving doctor details');
                return;
            }

            const select_staff_records = `SELECT DATE_FORMAT(UTC, '%d-%m-%Y') AS DATE, TIME_FORMAT(UTC, '%H:%i:%s') AS TIME, FIRST_NAME, LAST_NAME, EMAIL FROM STAFF WHERE ID = ${id}`;
            sql_conn.query(select_staff_records, (err, staff_record) => {
                if (err) {
                    console.log("Error in fetching Staff record");
                    throw err;
                }
                else {
                    res.render('staffview', {
                        staff_record: staff_record[0],
                        detail : physician_details[0]
                    });
                }
            });
        });
    }

    else {
        res.redirect('/login');
    }
});

module.exports = route;
