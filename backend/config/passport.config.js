const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');

const db = require('../utils/db.utils');
const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
  };

module.exports = function(passport){
    passport.use('local-strategy', 
        new JwtStrategy(options, (jwt_payload, done) => {
            console.log(jwt_payload)

            const userQuery = 'SELECT * FROM Users WHERE user_id = ?;';
            
            db.query(userQuery, [jwt_payload.sub], (err, result, fields) => {

                const data = result[0];

                if(err){
                    return done(err, false);
                }
                if(data){
                    return done(null, data);
                } else {
                    return done(null, false);
                }
            });
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