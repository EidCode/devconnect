const express = require('express');
const mongoose = require('mongoose');
const mongoUri = require('./config/keys').mongodbURI;
const bodyParser= require('body-parser');
const passport = require('passport');
const path = require('path');

//  importing routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts')

// firing app
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// connect to mongo database the newwest way
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => console.log('database connected'))
.catch(err => console.log(err))
mongoose.set('useFindAndModify', false);
// initialize passport
app.use(passport.initialize())
// config passport
require('./config/passport')(passport)



app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.get('/', (req, res) => res.json('hellow'));


// Heroku Part

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('app fired'))