const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

// create a new ninja model and Schema
const NinjaSchema = new Schema({
// schema from line 2.
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
  // add in geo location
});
const Ninja = mongoose.model('ninja', NinjaSchema);
module.exports = Ninja;
