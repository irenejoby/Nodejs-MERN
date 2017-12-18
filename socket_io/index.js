var express = require('express');
var socket = require('socket.io');

// app setup
var app = express();
var server = app.listen(5001, function(){
  console.log('listening to port 5001');
});

// static files.
app.use(express.static('public'));

// socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('a user is connected', socket.id);

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data)
  });
});
