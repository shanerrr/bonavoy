const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');

const db = require('./utils/db.utils');

db.connect();

// test conection
db.query('SELECT 1;', function (error, results, fields) {
    if (error) throw error;
    // connected!
  });

require('./config/passport.config')(passport);

// middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

// move routes from this file for cleanliness
app.use('/', require('./routes/app.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});
