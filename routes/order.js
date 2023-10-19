const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

route.get('/:id', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        const physician_id = req.session.prescriberID;
        let physician_details = `SELECT NPI, FIRST_NAME, LAST_NAME FROM REGISTERED_PRESCRIBER WHERE ID = ?`;

        sql_conn.query(physician_details, [physician_id], async (err, physician_details) => {
            if (err) {
                console.log('Error in retreiving doctor details');
                return;
            }

            const patient_id = req.params.id;
            const utc = req.query.day + ' ' + req.query.time;

            const order_data = `SELECT PATIENT_ID, DATE_FORMAT(UTC, '%Y-%m-%d') AS DAY, TIME_FORMAT(UTC, '%H:%i:%s') AS TIME_STAMP, REFILLS, MEDICINE, MED_TYPE, SIZE, INSTRUCTIONS, PATIENT_FIRSTNAME, PATIENT_LASTNAME, PATIENT_EMAIL, PHONE_NO, DATE, MONTH, YEAR, GENDER FROM PATIENT_INFO WHERE PATIENT_ID = ? AND UTC = ?`;
            const order_result = await queryDB(order_data, [patient_id, utc]);

            if (order_result.length > 0) {
                const patient_records_query = `SELECT ALLERGIES, DATE_FORMAT(UTC, '%Y-%m-%d') AS ADDED_DATE, TIME_FORMAT(UTC, '%H:%i:%s') AS ADDED_TIME FROM PATIENTS_RECORDS WHERE ID = ?`;
                const result = await queryDB(patient_records_query, [patient_id]);

                return res.render('order', {
                    order_result: order_result[0],
                    result: result[0] || '',
                    detail : physician_details[0]
                });
            } else {
                return res.render('order', {
                    order_result: '',
                    result: '',
                    detail : physician_details[0]
                });
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});

async function queryDB(query, params) {
    return new Promise((resolve, reject) => {
        sql_conn.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = route;