const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

route.post('/search_staff', (req, res) => {

    const search = req.body.searchStaff;
    const search_query = `SELECT FIRST_NAME AS ROW1, LAST_NAME AS ROW2, EMAIL AS ROW3, ID AS ROW4 FROM STAFF WHERE FIRST_NAME LIKE '%${search}%' OR LAST_NAME LIKE '${search}%'`;

        sql_conn.query(search_query, (err, results) => {
            if (err) throw err;

            if (results.length > 0 && results.length != 0) {
                res.json(results);
            }

            else {
                res.send("No results found");
            }
        });

});

module.exports = route;
