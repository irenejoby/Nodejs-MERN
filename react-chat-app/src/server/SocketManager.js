const io = require('./index.js').io

module.exports = function(socket){
  console.log('socket Id' + socket.id);
}
