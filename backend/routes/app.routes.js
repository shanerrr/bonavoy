const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { check, validationResult } = require('express-validator');

const utils = require('../utils/jwt.utils');
const db = require('../utils/db.utils');


// login
router.post('/login', (req, res) => {
	
	const userEmailQuery = 'SELECT hash FROM Users WHERE email = ?;'
	
	db.query(userEmailQuery, [req.body.email], (err, results, field) => {
		if(err){
			return res.send(err);
		}
		
		if(results === null || results.length < 1){
			return res.status(401)
			.json({success:false, msg:"no user with that email"});
		}
		
		const hash = results[0].hash;
		
		// compare hashed passwords
		bcrypt.compare(req.body.password, hash, (err, isMatch) => {
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
	const firstname = userData.firstname;
	const email = userData.email; 
	
	// hash password with salt
	bcrypt.genSalt(8, (err, salt) => { 
		bcrypt.hash(userData.password, salt, (err, hash) => {
			if(err){
				console.log(err);
				res.send(err);
			}
			
			const newUserQuery = 'INSERT INTO Users (email, hash, firstname) VALUES (?, ?, ?);';
			
			db.query(newUserQuery, [email, hash, firstname], 
				(err, results, fields) => {
					if(err){
						console.log(err);
						return res.send(err);
					}   
					
					const jwt = utils.issueJWT(results.insertId);
					return res.json({
						success:true, 
						token:jwt.token, 
						expiresIn: jwt.expires
					});
				});
				
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

// CRUD endpoints for trips
router.get('/trips/get', (req, res) => {
	res.status(200);
	res.send('GET request for trips');
})

router.post('/trips/save', (req, res) => {
	res.status(200);
	res.send('POST request for trips');
})

router.put('/trips/update', (req, res) => {
	res.status(200);
	res.send('PUT request for trips');
})

router.delete('/trips/delete', (req, res) => {
	res.status(200);
	res.send('DELET request for trips');
})

module.exports = router;
	