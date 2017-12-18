const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from DB
router.get('/ninjas', function(request, response, next){
  Ninja.geoNear(
    {type: 'Point', coordinates:[parseFloat(request.query.lng), parseFloat(request.query.lat)]},
    {maxDistance: 100000, spherical:true}
  ).then(function(ninjas){
    response.send(ninjas)
  })
});

// add a new ninja to the DB
router.post ('/ninjas', function(request, response, next){
  // console.log(request.body);
  Ninja.create(request.body).then(function(ninja){
    response.send(ninja);
  }).catch(next);
});

// update a ninja in the DB
router.put('/ninjas/:id', function(request, response){
  Ninja.findByIdAndUpdate({_id: request.params.id}, request.body).then(function(){
    Ninja.findOne({_id: request.params.id}).then(function(ninja){
      response.send(ninja);
    });
  });
});

// delete a ninja from the DB
router.delete('/ninjas/:id', function(request, response){
  Ninja.findByIdAndRemove({_id: request.params.id}).then(function(ninja){
    response.send(ninja);
  });

});

module.exports = router;
