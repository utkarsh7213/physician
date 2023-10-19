const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

route.post('/update_profile', (req, res) => {
    const input = req.body;

    const prescriberid = req.session.prescriberID;

    let update_query = `UPDATE PATIENTS_RECORDS SET ? WHERE ID = ${prescriberid}`;

    // sql_conn.query(update_query, [input], (err, update_result) => {
    //     if(err) {
    //         console.log("Error in updating data");
    //         throw err;
    //     }
    //     else {
    //         console.log("data updated");
    //     }
    // });
});

module.exports = route;
