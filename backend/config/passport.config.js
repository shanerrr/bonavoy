const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const User = require('../models/User.model');
const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
  };

module.exports = function(passport){
    passport.use('local-strategy', 
        new JwtStrategy(options, (jwtpayload, done) => {
            // search for user
            User.findOne({id:jwt_payload.sub}, function(err, user){

                // something hit the stanky leg
                if(err){
                    return done(err, false);
                }

                // found user
                if(user){
                    return done(null, user);

                // no user
                } else {
                    return done(null, false);
                }
            })
        })
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}