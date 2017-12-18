const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    passwd: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('users', UserSchema);
