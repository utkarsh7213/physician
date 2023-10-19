const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

route.post('/', (req, res) => {
    if (req.session.loggedIn) {
        const prescriber_id = req.session.prescriberID;
        const prescriber_name = `SELECT FIRST_NAME FROM REGISTERED_PRESCRIBER WHERE ID = '${prescriber_id}'`;
        const store_patient_info = `INSERT INTO PATIENT_INFO(ID, PRESCRIBER_NAME, PATIENT_EMAIL, PATIENT_FIRSTNAME, PATIENT_LASTNAME, PHONE_NO, PATIENT_ID, DATE, MONTH, YEAR, UTC, GENDER, CITY, _STATE, ZIP, MED_TYPE, SIZE, MEDICINE, REFILLS, COST, INSTRUCTIONS) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const select_patient = "SELECT * FROM PATIENTS_RECORDS WHERE ID = ?";

        const requestData = req.body; // Get data sent from the front end

        if (requestData.selectedPatientsData.length > 0) {
            const refills = requestData.additionalData.refills;
            const instructions = requestData.additionalData.instructions;

            requestData.selectedPatientsData.forEach((data) => {
                sql_conn.query(select_patient, [data.id], (err, patient_result) => {
                    if (err) throw err;

                    sql_conn.query(prescriber_name, async (err, pres_name) => {
                        if (err) throw err;
                        await sql_conn.query(store_patient_info, [
                            prescriber_id,
                            pres_name[0].FIRST_NAME,
                            patient_result[0].EMAIL,
                            patient_result[0].FIRST_NAME,
                            patient_result[0].LAST_NAME,
                            patient_result[0].PHONENO,
                            data.id,
                            patient_result[0].DAY,
                            patient_result[0].MONTH,
                            patient_result[0].YEAR,
                            patient_result[0].GENDER,
                            patient_result[0].CITY,
                            patient_result[0]._STATE,
                            patient_result[0].ZIP,
                            data.vehicle,
                            data.size,
                            data.medicine,
                            refills, 
                            data.price,
                            instructions
                        ],
                        async (err, store_res) => {
                            if (err) throw err;
                            else {
                                // console.log(patient_result[0]);
                                console.log(requestData);
                            }
                        });
                    });
                });
            });
            res.send("Prescription added successfully for selected patients");
        } else {
            res.status(400).send("No selected patients data found.");
        }
    } else {
        res.status(401).send("Unauthorized");
    }
});

module.exports = route;
