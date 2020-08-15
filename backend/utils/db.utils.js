const mysql = require('mysql');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })


var db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
})

module.exports = db;