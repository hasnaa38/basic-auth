'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { user } = require('../database/index');

// For signing up, data will be sent in the body [therefore, express.json() mush be used]
async function sign_up(req, res, next) {
    try {
        console.log('Running a sign-up process')
        // hashing the password directly in the req body to avoid adding a new object to the memory
        req.body.password = await bcrypt.hash(req.body.password, 5);
        // create the new user record
        const record = await user.create(req.body);
        res.status(201).json({
            message: 'user signed-up successfully',
            user_data: record
        });
        next();
    } catch (error) {
        res.status(403).json({
            message: 'an error occurred',
            error: error
        });
        next();
    }
}

async function sign_in(req, res, next) {
    //this req is sent in the auth header section
    const encodedString = req.headers.authorization.split(' ').pop(); // to get the last part of the encoded header only
    // Another way would be: const encodedString = req.headers.authorization.split(' ')[1]; 
    const decodedString = base64.decode(encodedString);
    const [username, password] = decodedString.split(':'); //spread operator
    /* To Do:
    1- use this username to get the user data from the db
    2- get the password for the username from the db
    3- compare the password from the db with the one in this req */
    const signed_user = await user.findOne({ where: { username: username } }); // getting the user data
    if (signed_user !== null) { // the user exists in the db
        const valid = await bcrypt.compare(password, signed_user.password); // comparing the user data password with the plain base-64 decoded password coming from the req
        if (valid) {
            return res.status(201).json({
                message: 'Valid Login',
                user_data: signed_user
            });
            next();
        } else {
            return res.status(403).send('Invalid user login')
        }
    } else {
        return res.status(403).send('User doesn\'t exist, sign-up before logging in')
    }
}

module.exports = {
    sign_up: sign_up,
    sign_in: sign_in,
}