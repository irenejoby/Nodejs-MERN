const User = require('../models/user');
const {check, validationResult} = require('express-validator/check');


const express = require('express');
const router = express.Router();


// registration validation
const arrValidate = [
                check('name', 'Please enter your Name').not().isEmpty(),
                check('name', 'Name should contain 5 characters').isLength({min: 5}),
                check('email', 'Please enter a valid email').isEmail(),
                check('name', 'Name shouldnot contain numbers').isAlpha(),
                check('passwd', 'Please enter a valid password').isLength({min:6, max:12}),
                check('conf_passwd', 'Passwords should match').custom( (value, {req}) => value === req.body.passwd),
                check('email', 'Email already exists').custom(value =>{
                  return User.find({'email': value})
                    .then(user =>{
                    if(user.length)
                      return false;
                    else {
                      return true;
                    }
                  });
                })
              ],

validateLogin = [
                check('email', 'Not an valid email').isEmail(),
                check('passwd', 'Please enter a password').not().isEmpty(),
                check('email', 'This email does not exist.').custom(value =>{
                  return User.findOne({email: value})
                      .then(user =>{
                          if(user)
                            return true;
                          else {
                            return false;
                            }
                          });
                }),
                check('email', 'Your password is not correct.')
                  .custom(function(value, { req }){
                    return User.findOne({email: value, passwd: req.body.passwd}).then( item =>{
                        return item;
                    });
                  })
];

router.post('/register', arrValidate, function(req, res){
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(422).json({ errors: errors.mapped() });
                }

            let newUser = new User({
              "name": req.body.name,
              "email": req.body.email,
              "passwd" : req.body.passwd
          });
          newUser.save()
          .then(function(err, record){
            if(err) throw err;
            console.log(record);

          })
          .catch( function(err){
            console.log(err);
          });
          console.log(req.body);
          res.end('Hello Users');
  });

router.post('/login', validateLogin, function(req, res){
        const errors = validationResult(req);
          if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.mapped() });
    }

          User.findOne({email: req.body.email, passwd: req.body.passwd})
          .then( item =>{
            req.session.userIsLoggedIn = item;
            res.end();
          })
          .catch(err =>{
            res.send(err);
          });
  });

  router.get('/profile', function(req, res){
    if(req.session.userIsLoggedIn){
    res.json(req.session.userIsLoggedIn );
    // read the session data and give it too the axios. there check ok or not if yes, get res from user
  }
  else {
    res.status(422).json({authorization: false});
  }
  });

router.get('/logout', function(req,res){
       req.session.destroy();
       res.end();
   });





  module.exports = router;
