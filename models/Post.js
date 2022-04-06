const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    text:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true
    },
    avatar:{
        type:String
    },

    likes:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            text:{
                type:String
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default: Date.now
            }
        }
    ]
})

module.exports = User = mongoose.model('post', PostSchema)