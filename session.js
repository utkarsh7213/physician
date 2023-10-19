const session = require('express-session');
const MySQLStore = require('express-mysql-session') (session);

const sessionStore = new MySQLStore({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "",
    database : "HOSPITAL"
});

module.exports = sessionStore;