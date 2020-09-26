const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(
  process.env.DB_MONG,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => {
    console.log("Mongoose Is Connected");
  }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.config")(passport);


// Routes
app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({
          success: true
        });
        console.log(req.user);
      });
    }
  })(req, res, next);
});
app.post("/api/register", (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hash = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
      });
      await newUser.save();
      passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.json({
              success: true
            });
            console.log(req.user);
          });
        }
      })(req, res, next);
    }
  });
});
app.get("/api/getUser", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.get('/api/logout', function (req, res){
  req.session.destroy();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});