const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new mongoose.Schema({
    image: String,
    email: String,
    full_name: String,
    password: String,
    isAdmin: Boolean,
    googleId: String,
    githubId: String,
    isBanned: Boolean,
    toRead: [{type: Schema.Types.ObjectId, ref: 'blog'}],
    read: [{type: Schema.Types.ObjectId, ref: 'blog'}],
    osebe: String
})

module.exports = mongoose.model('user' , UserSchema)