const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

function RandomDigits(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        result += randomDigit;
    }
    return result;
}

route.post('/upload_patient', (req, res) => {
    const patient_data = req.body;
    console.log(req.body);
    const patient_id = RandomDigits(6);
    const prescriber_id = req.session.prescriberID;
    const prescriber_name = `SELECT FIRST_NAME FROM REGISTERED_PRESCRIBER WHERE ID = '${prescriber_id}'`;

    if (!patient_data.first_name || !patient_data.last_name || !patient_data.email || !patient_data.phoneno) {
        res.send("Some fields are missing.");
        return;
    }
    
    sql_conn.query(`SELECT EMAIL, PHONENO FROM PATIENTS_RECORDS WHERE EMAIL = '${patient_data.email}' OR PHONENO = '${patient_data.phoneno}'`, (err, result) => {
        if (err) throw err;
        
        if (result.length > 0) {
            res.send("Patient's phone number or Email is already Registered");
            return;
        }
        else {
            sql_conn.query(prescriber_name, (err, pres_res) => {
                if (err) throw err;
                const register_patient_data = "INSERT INTO PATIENTS_RECORDS (ID, FIRST_NAME, LAST_NAME, GENDER, MONTH, DAY, YEAR, EMAIL, PHONENO, ALLOW_TEXTING, ALLERGIES, PRESCRIBER_ID, PRESCRIBER_NAME, CITY, _STATE, ZIP) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                const values = [
                    patient_id, 
                    patient_data.first_name, 
                    patient_data.last_name, 
                    patient_data.gender, 
                    patient_data.month, 
                    patient_data.day, 
                    patient_data.year, 
                    patient_data.email, 
                    patient_data.phoneno, 
                    patient_data.allow_texting || null, 
                    patient_data.allergies || null, 
                    prescriber_id, 
                    pres_res[0].FIRST_NAME, 
                    patient_data.city || null, 
                    patient_data.state || null, 
                    patient_data.zip || null
                ];

                sql_conn.query(register_patient_data, values, (err) => {
                    if (err) {
                        console.error(err);
                        res.send("An error occurred while registering the patient.");
                    } else {
                        res.redirect('/');
                    }
                });
            });
        }
    });
});

module.exports = route;


















// route.post('/upload_patient', (req, res) => {
//     const patient_data = req.body;
//     console.log(req.body);
//     const patient_id = RandomDigits(6);
//     const prescriber_id = req.session.prescriberID;
//     const prescriber_name = `SELECT FIRST_NAME FROM REGISTERED_PRESCRIBER WHERE ID = '${prescriber_id}'`;
//     const register_patient_data = "INSERT INTO PATIENTS_RECORDS(ID, FIRST_NAME, LAST_NAME, GENDER, MONTH, DAY, YEAR, EMAIL, PHONENO, ALLOW_TEXTING, ALLERGIES, PRESCRIBER_ID, PRESCRIBER_NAME, CITY, _STATE, ZIP) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

//     // res.json({msg : "Patient Created"});

//     sql_conn.query(`SELECT EMAIL, PHONENO FROM PATIENTS_RECORDS WHERE EMAIL = '${patient_data.email}' OR PHONENO = '${patient_data.phoneno}'`, (err, result) => {
//         if (err) throw err;
        
//         if (result.length > 0) {
//             res.send("Patient's phone number or Email is already Registered");
//             return;
//         }
//         else {
//             sql_conn.query(prescriber_name, (err, pres_res) => {
//                 if (err) throw err;
//                 sql_conn.query(register_patient_data, [patient_id, patient_data.first_name, patient_data.last_name, patient_data.gender, patient_data.month, patient_data.day, patient_data.year, patient_data.email, patient_data.phoneno, patient_data.allow_texting, patient_data.allergies, prescriber_id, pres_res[0].FIRST_NAME, patient_data.city, patient_data.state, patient_data.zip], (err) => {
//                     if (err) throw err;
//                     else {
//                         res.redirect('/');      
//                     }
//                 });
//             });
//         }
//     });

// });

