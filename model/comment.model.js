const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    userId:[
    {name: String},
    {
        type:Schema.Types.ObjectId,
        ref:"User"
    }
],
    comment: {
        type: String
    },
})

module.exports = mongoose.model('Comment',Comment);