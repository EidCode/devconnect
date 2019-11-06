const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/profile');
const User = require('../../models/User');
const isEmpty = require('../../validation/is-Empty')

const validateProfileInput = require('../../validation/profile');
const validateExperiencesInput = require('../../validation/experiences');
const validateEducationInput = require('../../validation/education');

router.get('/test', (req, res) => res.send('hellow from profile test'));


// get profile
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id}).populate('user',['name','avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'their  is no profile for this user yet';
            return res.status(404).json(errors)
        }
        res.json(profile)
    }).catch(err => res.json(err))
});

router.get('/handle/:handle',(req, res) => {
    const errors = {};
    Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) { 
            errors.noprofile = 'their  is no profile for this user yet';
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
});

router.get('/all', (req, res) => {
    const errors = {};
    Profile.find().populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofiles = 'their are no profiles';
            return res.status(404).json(errors)
        }
        res.json(profiles)
    }).catch(err => res.json({error : 'no profiles'}))
})

router.get('/user/:user_id',(req, res) => {
    const errors = {};
    Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) { 
            errors.noprofile = 'their  is no profile for this user yet';
            return res.status(404).json(errors)
        }
        res.json(profile)
    }).catch(err => res.json({error: 'no profile for this user'}))
})

// add and updateprofile

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    // validation part
    const { errors, isValid } = validateProfileInput(req.body);
    if(!isValid) {
        console.log(isValid)
        return res.status(400).json(errors)
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    if(typeof(req.body.skills !== 'undefined')) {
        profileFields.skills = req.body.skills.split(',')
    }

    profileFields.social = {}
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instgram) profileFields.social.instgram = req.body.instgram;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile) {
                //update
                Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
                    .then(profile => res.json(profile))
            } else {
                // create
                Profile.findOne({handle: profileFields.handle})
                    .then(profile => {
                        if(profile) {
                            errors.handle= 'handle is already exists';
                            res.status(400).json(errors)
                        }
                        new Profile(profileFields).save().then(profile => res.json(profile)) 
                    })
            }
        })

});

router.post('/experiences', passport.authenticate('jwt', {session: false}), (req, res) => {

    // validation part
    const { errors, isValid } = validateExperiencesInput(req.body);
    if(!isValid) {
        return res.status(404).json(errors)
    }

    Profile.findOne({user: req.user.id})
    .then(profile => {
        const newExperience = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        profile.experiences.unshift(newExperience);
        profile.save()
        .then(saved => res.json(saved))
        .catch(err => res.status(404).json(errors))
    });
});

router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {

    // validation part
    const { errors, isValid } = validateEducationInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors)
    }

    Profile.findOne({user: req.user.id})
    .then(profile => {
        
        const newEducation = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        profile.education.unshift(newEducation);
        profile.save().then(saved => res.json(saved))
    });
});

router.delete('/experiences/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({user: req.user.id}).then(profile => {
        
        const expIndex = profile.experiences.map(item => item.id).indexOf(req.params.exp_id)
        profile.experiences.splice(expIndex, 1);
        profile.save().then(profile => res.json(profile))
    })
    
});

router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({user: req.user.id}).then(profile => {
        
        const eduIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        console.log(eduIndex)
        profile.education.splice(eduIndex, 1);
        profile.save().then(profile => res.json(profile))
    })
    
});


router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndRemove({user: req.user.id})
        .then(() => {
            User.findOneAndRemove({_id: req.user.id})
            .then(() => {
                
                res.json({success: true})
            }
            )  })
})


module.exports= router;