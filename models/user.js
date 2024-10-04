const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    verified: Boolean,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;