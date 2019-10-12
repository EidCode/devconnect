const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.send('hellow from user test'))


module.exports= router;