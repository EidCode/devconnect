const express = require('express');
const mongoose = require('mongoose');
const mongoUri = require('./config/keys').mongodbURI;
const bodyParser= require('body-parser');
const passport = require('passport');

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



const port = process.env.PORT || 5000;
app.listen(port, () => console.log('app fired'))