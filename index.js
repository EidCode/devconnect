const express = require('express');
const mongoose = require('mongoose');
const mongoUri = require('./config/keys').mongodbURI;

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts')

const app = express();

mongoose.connect(mongoUri, { useNewUrlParser: true })
.then(result => console.log('database connected'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('hellow mohamed')
});

app.use('/api/users', users);
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('app fired'))