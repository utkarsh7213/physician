const sql_conn = require('../db');
const express = require('express');
const route = express.Router();

route.post('/:id', async (req, res) => {
    const patient_id = req.params.id;
    const utc = req.query.day + ' ' + req.query.time;

    console.log(patient_id + ' ' + utc);

    // Get the current UTC timestamp in the desired format
    const currentUTC = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const update_instruction = `UPDATE PATIENT_INFO SET INSTRUCTIONS = ?, REFILLS = ?, UTC = ? WHERE PATIENT_ID = ? AND UTC = ?;`;

    sql_conn.query(update_instruction, [req.body.instruction, req.body.refills, currentUTC, patient_id, utc], (err, result) => {
        if (err) {
            console.error('Error in updating Instructions and Refills:', err);
            res.status(500).json({ error: 'An error occurred while updating.' });
        } else if (result.affectedRows === 0) {
            console.error('No matching rows found for the provided PATIENT_ID and UTC.');
            res.status(404).json({ error: 'No matching rows found.' });
        } else {
            // Fetch the updated record and send it in the response
            const fetchUpdatedRecord = `SELECT PATIENT_ID, DATE_FORMAT(UTC, '%Y-%m-%d %H:%i:%s') AS time FROM PATIENT_INFO WHERE PATIENT_ID = ? AND UTC = ?;`;

            sql_conn.query(fetchUpdatedRecord, [patient_id, currentUTC], (fetchErr, fetchResult) => {
                if (fetchErr) {
                    console.error('Error in fetching the updated record:', fetchErr);
                    res.status(500).json({ error: 'An error occurred while fetching the updated record.' });
                } else if (fetchResult.length === 0) {
                    console.error('No matching rows found for the provided PATIENT_ID and UTC after the update.');
                    res.status(404).json({ error: 'No matching rows found after the update.' });
                } else {
                    res.json({ success: 'Done', updatedRecord: fetchResult[0] });
                }
            });
        }
    });
});

module.exports = route;







// const sql_conn = require('../db');
// const express = require('express');
// const route = express.Router();

// route.post('/:id', async (req, res) => {
//     const patient_id = req.params.id;
//     const utc = req.query.day + ' ' + req.query.time;

//     console.log(patient_id + ' ' + utc);

//     const update_instruction = `UPDATE PATIENT_INFO SET INSTRUCTIONS = ?, REFILLS = ? WHERE PATIENT_ID = ? AND UTC = ?;`;

//     sql_conn.query(update_instruction, [req.body.instruction, req.body.refills, patient_id, utc], (err, result) => {
//         if (err) {
//             console.error('Error in updating Instructions and Refills:', err);
//             res.status(500).json({ error: 'An error occurred while updating.' });
//         } else if (result.affectedRows === 0) {
//             console.error('No matching rows found for the provided PATIENT_ID and UTC.');
//             res.status(404).json({ error: 'No matching rows found.' });
//         } else {
//             res.json({ success: 'Done' });
//         }
//     });
// });

// module.exports = route;