const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const db = require('./utils/db.utils');
const { session } = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

db.connect();

// test conection
db.query('SELECT 1;', function (error, results, fields) {
    if (error) throw error;
    // connected!
  });

// const sessionStore = new MySQLStore({
//   expiration: (960000*5),
//   endConnectionOnClose: true
// }, db);

require('./config/passport.config')(passport);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:3000/",
  credentials: true
}));
app.use(express.json());

// move routes from this file for cleanliness
app.use('/api', require('./routes/app.routes')); 
// for making external calls to pass to client
app.use('/api/external', require('./routes/external.routes')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});
