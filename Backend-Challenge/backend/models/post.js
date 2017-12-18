const mongoose = require('mongoose');

let BookSchema = mongoose.Schema({

  post:{
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('posts', BookSchema);
