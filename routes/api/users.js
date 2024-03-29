const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const Profile = require('./profile')

// validation functions
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.post('/register', (req, res) => {

    // validation part
    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid) {
        console.log(isValid)
        return res.status(400).json(errors)
    }
    

    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            errors.email = 'email is already exists';
            return res.json(errors)
        } else {
            const avatar = gravatar.url(req.body.email, {protocol: 'http', format:'qr'});

            // intialit new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    // saving new user
                    newUser.save()
                    .then(user => (res.json(user)))
                    .catch(err => console.log(err))
                })
            })
        }
        
    })
});

router.post('/login', (req, res) => {

    // validation part
    const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid) {
        console.log(isValid)
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;
    

    User.findOne({email: email}).then(user => {
        if(!user) {
            
            
            return res.status(404).json({email: 'user is not exist'})
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {

                // jwt part
                const payload = {id: user.id, name: user.name, avatar: user.avatar};
                jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });

            } else {
                errors.password = 'password is not correct'
                return res.status(404).json({password: errors.password })
            }
        })
        
    })
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json(req.user);
});



module.exports= router;