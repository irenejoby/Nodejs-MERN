const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongoDB
mongoose.connect('mongodb://localhost/ninjaDB');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());
// initialize routes 
app.use('/api', require('./routes/api'));
// /api is then a default route

// error handling middleware
app.use(function(err, request, response, next){
    console.log(err); // to see properties of message in our console
    response.status(422).send({error: err.message});
});

// listen to requests
app.listen(process.env.port || 4000, function(){
  console.log('Now listening for requests through port 4000');
});
