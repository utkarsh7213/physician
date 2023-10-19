const express = require('express');
const sql_conn = require('../db');
const route = express.Router();

// ROUTE.GET IS LINKED WITH APP.JS USING ROUTE AND DATA FROM CREATE.EJS TEMPLATE
// RENDER MEDICINE TEMPLATE AFTER GETTING DATA FROM THE MYSQL DATABASE

route.get('/select', (req, res) => {
    if(req.session.loggedIn) {

        const physician_id = req.session.prescriberID;
        let physician_details = `SELECT NPI, FIRST_NAME, LAST_NAME FROM REGISTERED_PRESCRIBER WHERE ID = ?`;

        sql_conn.query(physician_details, [physician_id], async (err, physician_details) => {
            if(err) {
                console.log('Error in retreiving doctor details');
                return;
            }

            const href = req.query.href;
            const categories = `SELECT * FROM ${href} ORDER BY MEDICINE`;
            
               await sql_conn.query(categories, async (err, category_res) => {
                    if (err) throw err;
            
                    const obj = {
                        category_res: category_res
                    }
                    await res.render('medicine', {
                        category_res: obj.category_res,
                        table : href,
                        detail : physician_details[0]
                    });   
                });
        });
        
    }
    else {
        res.redirect('/login');
    }

});

module.exports = route;
