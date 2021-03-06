const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    user_name:{
        type:String
    },
    user_password:{
        type:String
    },
    user_address:{
        type:String
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    comment:{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
},{
    collection:'user'  
})

module.exports = mongoose.model('User',User);