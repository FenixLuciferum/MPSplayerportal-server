const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({

    user: String,
    userID: String,

});

const Session = mongoose.model('session', sessionSchema);
module.exports = Session;