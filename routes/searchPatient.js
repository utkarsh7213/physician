const express = require('express');
const sql_conn = require('../db');
const body_parser = require('body-parser');
const route = express.Router();
const app = express();

app.use(body_parser.urlencoded({
    extended: false
}));

route.post('/search_patient', (req, res) => {

    const search = req.body.search;
    // const search_query = `SELECT ID, FIRST_NAME AS ROW1, LAST_NAME AS ROW2, DAY AS DATE, MONTH AS MON, YEAR AS YR, PHONENO, EMAIL FROM PATIENTS_RECORDS WHERE FIRST_NAME LIKE '%${search}%' OR LAST_NAME LIKE '${search}%' OR PHONENO LIKE '%${search}%' WHERE PRESCRIBER_ID = '${req.session.prescriberID}'`;
    const search_query = `
        SELECT ID, 
        FIRST_NAME AS ROW1, 
        LAST_NAME AS ROW2, 
        DAY AS DATE, 
        MONTH AS MON, 
        YEAR AS YR, 
        PHONENO, 
        EMAIL 
        FROM PATIENTS_RECORDS 
        WHERE (FIRST_NAME LIKE '%${search}%' OR LAST_NAME LIKE '%${search}%' OR PHONENO LIKE '%${search}%')
        AND PRESCRIBER_ID = '${req.session.prescriberID}'`;

    if (search.length > 0) {
        sql_conn.query(search_query, (err, results) => {
            if (err) throw err;

            if (results.length > 0 && results.length != 0) {
                res.json(results);
            }

            else {
                res.send("No results found");
            }
        });
    }

});


module.exports = route;
