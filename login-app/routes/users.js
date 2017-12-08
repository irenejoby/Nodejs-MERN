var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../model/user');

// Register
router.get('/register', function(request, response){
  response.render('register');
});

// Login
router.get('/login', function(request, response){
  response.render('login');
});

// Register User.new
router.post('/register', function(request, response){
  var name = request.body.name;
  var email = request.body.email;
  var username = request.body.username;
  var password = request.body.password;
  var password2 = request.body.password2;

    // validation
    request.checkBody('name', 'Name is required').notEmpty();
	  request.checkBody('email', 'Email is required').notEmpty();
	  request.checkBody('email', 'Email is not valid').isEmail();
	  request.checkBody('username', 'Username is required').notEmpty();
	  request.checkBody('password', 'Password is required').notEmpty();
	  request.checkBody('password2', 'Passwords do not match').equals(request.body.password);

    var errors = request.validationErrors();
    if(errors){
      response.render('register', {
        errors:errors
      });
    }
    else{
      var newUser =new User({
        name: name,
        email: email,
        username: username,
        password: password
      });

      User.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log(user);
      });
      request.flash('success_msg', 'You are now registered and can login');
      response.redirect('/users/login');
    }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message:'Unknown user'});
      }
    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        return done(null, user);
      }
      else{
        return done(null, false, {message:'Invalid password'});
      }
    });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash:true}),
  function(request, response){
    response.redirect('/');
  });

router.get('/logout', function(request, response){
  request.logout();
  request.flash('success_msg', 'You are logged out');
  response.redirect('/users/login');
});

module.exports = router;
