require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const Sequelize = require("sequelize");
const passport = require('passport');

// connect to database
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host:process.env.DB_HOST,
    dialect:'mysql',
    port:process.env.DB_PORT,
    pool: {
        max: 5,
        min: 1,
        idle: 60000,
    },
})

// test db connection
db.authenticate()
    .then(()=>{
        console.log('connection successful');
    })
    .catch((err)=>{
        console.log(err);
    })

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

