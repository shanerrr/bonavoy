const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');


/**
 * Sets the JWT sub to the user id and also sets the iat
 * @param user - The user object 
 * @returns JWT object
 */
function issueJWT(user){
    const id = user.id;

    const expiresIn = '1d';

    const payload = {
        sub:id,
        iat:Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn:expiresIn, algorithm:'RS256'});

    return {
        token:"Bearer " + signedToken,
        expires:expiresIn
    }
}

module.exports.issueJWT = issueJWT;