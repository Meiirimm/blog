const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment');


const CommentSchema = new mongoose.Schema({
    text: String,
    blogId: {type: Schema.Types.ObjectId, ref: 'blog'},
    authorId: {type: Schema.Types.ObjectId, ref: 'user'},
    date: {
        type: Date,
        default: moment().format('DD.MM.YYYY HH:mm')
    }
})

CommentSchema.virtual('formattedDate').get(function() {
    return moment(this.date).format('DD.MM.YYYY HH:mm');
});

module.exports = mongoose.model('comment' , CommentSchema)