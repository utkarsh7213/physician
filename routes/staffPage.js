const express = require('express');
const route = express.Router();
const sql_conn = require('../db');

route.get('/', function (req, res) {
    // if (req.session.loggedIn) {
        const fetch_staff_data = 'SELECT * FROM STAFF';
        const count_staff_members = 'SELECT COUNT(*) AS TOTAL FROM STAFF';

        if (req.session.staffloggedIn) {
            const physician_id = req.session.prescriberID;
            let physician_details = `SELECT NPI, FIRST_NAME, LAST_NAME FROM REGISTERED_PRESCRIBER WHERE ID = ?`;

            sql_conn.query(physician_details, [physician_id], async (err, physician_details) => {
                if(err) {
                    console.log('Error in retreiving doctor details');
                    return;
                }
                // console.log("LoggedIn");
                sql_conn.query(fetch_staff_data, (err, staff_data) => {
                    if (err) throw err;
                    else {
                        sql_conn.query(count_staff_members, (err, count_staff) => {
                            if (err) throw err;
                            const staffdata = {
                                data: staff_data,
                                count: count_staff[0].TOTAL
                            };
                            res.render('staff', {
                                data: staffdata.data,
                                count: staffdata.count,
                                detail : physician_details[0]
                            });
                        });
                    }
                });
            })
        }
        else {
            // console.log("Logged Out");
            res.redirect('/staff-login');
        }

        // console.log(req.session.prescriberID);
    // }
    // else {
    //     res.redirect('/login');
    // }
});

module.exports = route;