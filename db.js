const mysql = require('mysql');
require('dotenv').config();

const sql_conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port : process.env.PORT,
});

sql_conn.connect((err) => {
    if(err) throw err;
});

module.exports = sql_conn;