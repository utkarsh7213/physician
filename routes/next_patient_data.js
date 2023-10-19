const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

route.get('/next', (req, res) => {
    const offset = parseInt(req.query.offset);
    const limit = parseInt(req.query.limit);
    const next_patient_records = `SELECT * FROM PATIENTS_RECORDS WHERE PRESCRIBER_ID = ? LIMIT ?, ?`;
    // const next_patient_records = "SELECT * FROM patients_records LIMIT ?, ?";

    sql_conn.query(next_patient_records, [`${req.session.prescriberID}`, offset, limit], (err, next_data) => {
        if (err) {
            console.log("Error occured while fetching data from the database");
            throw err;
        }
        res.send(next_data);
    });
});

module.exports = route;
