const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment');


const BlogSchema = new mongoose.Schema({
    titleRus: String,
    image: String,
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    date: {
        type: Date,
        default: Date.now()
    }
})

BlogSchema.virtual('formattedDate').get(function() {
    return moment(this.date).format('DD.MM.YYYY');
});


module.exports = mongoose.model('blog' , BlogSchema)