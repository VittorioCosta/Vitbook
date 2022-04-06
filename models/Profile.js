const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    instruments:{
        type:[String],
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    status:{
        type:String,
        required: true
    },
    skills:{
        type:[String],
        required: true
    },
    genre:{
        type:[String],
        required: true
    },
    description: {
        type: String
    },
    experience: [
        {
          band: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
        }
      ],
      education: [
        {
          course: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
        }
      ],
      social: {
        youtube: {
          type: String
        },
        twitter: {
          type: String
        },
        facebook: {
          type: String
        },
        instagram: {
          type: String
        }
      },
      date: {
        type: Date,
        default: Date.now
      }


})

module.exports = Profile = mongoose.model('profile', ProfileSchema)