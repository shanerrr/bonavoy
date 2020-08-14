const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const { response } = require('express');

const User = require('../models/User.model');
const utils = require('../utils/jwt.utils');

// homepage
router.get('/', (req, res) => {
    // TODO: middleware for redirecting
    res.send("login or register to travel planner");
});


// login
router.post('/login', (req, res) => {

    User.findOne({
        where:{email:req.body.email}
    })
    .then((data) => {
        
        if(!data || data === null){
            return res.status(401)
                .json({success:false, msg:"no user with that email"});
        }

        // compare hashed passwords
        bcrypt.compare(req.body.password, data.hash, (err, isMatch) => {
            if(err) throw err;

            // good login
            if(isMatch){
                const tokenObj = utils.issueJWT(req.body);
                return res.status(200)
                    .json({
                        success:true, 
                        token:tokenObj.token, 
                        expiresIn:tokenObj.expires
                    });
            } 

            // bad login
            else {
                return res.status(401).json({success:false, msg:'wrong password'});
            }
        }); 
    })
    .catch((err) => res.send(err));
})


// register
router.post('/register', [
        check('email').notEmpty(),
        check('firstname').isLength({min:2}),
        check('password').isLength({min:6}),
        check('confirmPassword', 'Passwords do not match')
            .notEmpty()
            .custom((value, { req }) => value === req.body.password),
        check('email').isEmail()
    ],
    (req, res, next) => {

        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        }
    
        const userData = req.body;    

        // hash password with salt
        bcrypt.genSalt(8, (err, salt) => { 
            bcrypt.hash(userData.password, salt, (err, hash) => {
                if(err){
                    console.log(err);
                    res.send(err);
                }

                const newUser = {
                    'firstname': userData.firstname, 
                    'hash': hash,
                    'email': userData.email,
                };
                
                // write to db
                User.create(newUser)
                    .then((response) => {
                        res.status(200);
                        const jwt = utils.issueJWT(response.dataValues);
                        res.json({
                            success:true, 
                            user:response.dataValues, 
                            token:jwt.token, 
                            expiresIn: jwt.expires
                        }); // TODO: remove user:response.dataValues from response
                    })
                    .catch((err) => {
                        res.status(400);
                        res.send(err);
                    })
            });
        })
    
    }
)

// view users trips
router.get('/trips', (req, res) => {
    res.send('trips');
})


// plan and edit a trip
router.get('/trips/planner', (req, res) => {
    res.send('planner');
});


// view and edit account details
router.get('/account', 
    passport.authenticate('local-strategy', {session:false}),
    (req, res) => {
        res.json({
            firstname:req.user.firstname, 
            email:req.user.email
        });
});


module.exports = router;
