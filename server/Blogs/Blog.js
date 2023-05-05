const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new mongoose.Schema({
    titleRus: String,
    image: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('blog' , BlogSchema)