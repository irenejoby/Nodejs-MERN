const Post = require('../models/post');


const express = require('express');
const routerb = express.Router();


routerb.post('/addpost', function(req, res){

    let newPost = new Post({
      "post": req.body.post,
      "user": req.body.user

  });
  newPost.save()
  .then(function(err, record){
    if(err) throw err;
    console.log(record);

  })
  .catch( function(err){
    console.log(err);
  });
  console.log(req.body);
  res.end('A new post is added');
});

routerb.get('/getpost', function (req, res) {
  // if(req.session.userIsLoggedin){
    return Post.find({})
  .then(user=>{
    res.json(user)
    res.end()
  }).catch(err=>{
    res.send(err)
  })

})



module.exports = routerb;
