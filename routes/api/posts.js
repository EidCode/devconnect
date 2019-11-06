const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/posts');
const validatePostInput = require('../../validation/post');
const Profile = require('../../models/profile');




router.get('/', (req, res) => {
    Post.find().sort({date: -1}).then(posts=> res.json(posts)).catch(err => res.json(err))
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post=> res.status(200).json(post)).catch(err => res.json(err))
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors)
    }
    const newPost = new Post({
        text: req.body.text,
        name:  req.body.name,
        avatar: req.user.avatar,
        user: req.user.id
    });
    newPost.save().then(post => res.json(post))
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {{
        Post.findById(req.params.id).then(post => {
            if(post.user.toString() !== req.user.id) {
                return res.status(404).json('you are not allowed to delete this post')
            }
            post.remove().then(done=> res.json('succesfully deleted')).catch(err => res.json(err))
        }).catch(err => res.json({err: 'no post found'}))
    }})
    
});

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {{
        Post.findById(req.params.id).then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(404).json('you already liked this post')
            }
            post.likes.unshift({user: req.user.id})
            post.save().then(post=> res.json(post)).catch(err => res.json(err))
        }).catch(err => res.json({err: 'no post found'}))
    }})
    
});

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {{
        Post.findById(req.params.id).then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(404).json('you didnt like this post')
            }
            const userIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
            post.likes.splice(userIndex, 1)
            post.save().then(post=> res.json(post)).catch(err => res.json(err))
        }).catch(err => res.json({err: 'no post found'}))
    }})
    
});

router.post('/comments/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors)
    }
    Post.findById(req.params.id).then(post => {
        const newComment = {
            text: req.body.text,
            name: req.user.name,
            avatar: req.body.avatar,
            user: req.user.id

        }

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post))
    })
    
});

router.delete('/deleteComment/:id/:commentId', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    Post.findById(req.params.id).then(post => {
        
        const removedIndex = post.comments.map(like => like._id.toString()).indexOf(req.params.commentId);
        console.log(removedIndex)
        post.comments.splice(removedIndex, 1)

        post.save().then(post => res.json(post))
        
    })
    
});

module.exports= router;