const db = require('../utils/db.utils');

// db.query('DROP TABLE IF EXISTS Users;');
const userSchema = 'CREATE TABLE IF NOT EXISTS Users (user_id INT AUTO_INCREMENT PRIMARY KEY, email CHAR(50) NOT NULL UNIQUE,hash CHAR(255) NOT NULL,firstname CHAR(50) NOT NULL);'

db.query(userSchema, (err, result) => {
    if (err) throw err;
    console.log("Users table created");
})