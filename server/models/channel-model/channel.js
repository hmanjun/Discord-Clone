const {Schema, model} = require('mongoose')

//const textChatSchema = require('./textChatSchema')

const channelSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        users: [{
            type: String,
            required: true
        }]
    }
)

const Channel = model('channel', channelSchema)
module.exports = Channel