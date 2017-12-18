 // Packages
 const express    = require('express');
 const path       = require('path');
 const mongoose   = require('mongoose');
 const bodyParser = require('body-parser');
 const cors       = require('cors');
 const session    = require('express-session');

 // Mongodb Connection
 mongoose.Promise = global.Promise;
 mongoose.connect("mongodb://localhost/reddit", {useMongoClient: true})
         .then( () => { // check db connection
             console.log('MongoDB has been conneted');
         })
         .catch( err => { //Check for db errors
             console.log(`There is an error: ${err}`);
         });

 // Create express server
 const app = express();

 // Load Views
 // app.set('views', path.join(__dirname, 'views'));
 // app.set('view engine', 'pug');

 // Define a static folder path
 // app.use(express.static(path.join(__dirname, 'public')));

 // Parse posted data - Middelware
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

 // Cross-origin resource sharing - Middelware
 app.use(cors({
     origin:['http://localhost:3000'],
     // localhost for react---3000.
     methods:['GET','POST', 'DELETE', 'PUT'],
     credentials: true // enable set cookie
 }));

 // Session - Middelware
 app.use(session({resave: true,secret: 'Vt9PxTrm~E{4`9]T',saveUninitialized:true}));

 // Routes
 app.use('/users', require('./controllers/users'));
 app.use('/posts', require('./controllers/posts'));


 // Listen to port
 const port = process.argv[2] || process.env.port || 3500;
 app.listen( port, () => {
     console.log(`Server is listening on ${port}.`);
 });
