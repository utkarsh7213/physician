const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

// ROUTE.POST IS LINKED WITH APP.JS CODE(app.use('/submit', require('./routes/review'))) 
// GET DATA FROM MEDICINE.EJS TEMPLATE
// RENDER REVIEW TEMPLATE WITH REQUESTED DATA FROM THE MYSQL DATABASE

route.post('/', (req, res) => {
    const href_table = req.query.hreftab; 
    const href_id = req.query.hrefid;
    const select_query = `SELECT * FROM ${href_table} WHERE ID = '${href_id}'`;

    const physician_id = req.session.prescriberID;
    let physician_details = `SELECT NPI, FIRST_NAME, LAST_NAME FROM REGISTERED_PRESCRIBER WHERE ID = ?`;

    sql_conn.query(physician_details, [physician_id], async (err, physician_details) => {
        if(err) {
            console.log('Error in retreiving doctor details');
            return;
        }

        sql_conn.query(select_query, async (err, review_result) => {
            if(err) throw err;
            else {
                await res.render('review', {
                    review_result,
                    detail : physician_details[0]
                });
            }
        });
    });


});

module.exports = route;
