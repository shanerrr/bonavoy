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
    if (!user) res.json({success: false});
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
app.post("/api/preregister", (req, res, next) => {
  
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(req.body.email)) {
    return res.json({
      success: false,
      reason: 'invalidemail'
    });
  }
  if ((req.body.username.length <= 4) || (req.body.username.length > 15)) {
    return res.json({
      success: false,
      reason: 'usernamelength'
    });
  }
  if (req.body.password.length < 8 || req.body.password.length > 25) {
    return res.json({
      success: false,
      reason: 'passwordlength'
    });
  }
  User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}]}, async (err, doc) => {
    if (err) throw err;
    if (doc && doc.username === req.body.username){
      return res.json({
        success: false,
        reason: 'usernameexists'
      });
    }
    if (doc && doc.email === req.body.email){
      return res.json({
        success: false,
        reason: 'emailexists'
      });
    }
    if (!doc) {
      return res.json({
        success: true
      });
    }
  });
});
app.post("/api/register", (req, res, next) => {
  
  if ((req.body.firstname.length < 1) || (req.body.firstname.length > 30)) {
    return res.json({
      success: false,
      reason: 'firstnamelength'
    });
  }
  if (req.body.lastname.length < 1 || req.body.lastname.length > 35) {
    return res.json({
      success: false,
      reason: 'lastnamelength'
    });
  }
  User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}]}, async (err, doc) => {
    if (err) throw err;
    if (!doc) {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        username: req.body.username,
        password: hash,
        email: req.body.email,
        DateCreated: new Date(),
        verified: false
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
app.use('/api', require('./routes/app.routes')); 
app.use('/api/external', require('./routes/external.routes')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});