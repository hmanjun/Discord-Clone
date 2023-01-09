const {Schema, model, mongo, default: mongoose} = require('mongoose')

//const textChatSchema = require('./textChatSchema')

const channelSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
        chatRooms: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'chatroom'
        }]
    }
)

const Channel = model('channel', channelSchema)
module.exports = Channel