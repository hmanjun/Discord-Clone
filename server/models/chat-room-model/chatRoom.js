const {Schema, model, default: mongoose} = require('mongoose')

const roomSchema = newSchema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message'
        }],
        activeUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }]
    }
)

const ChatRoom = model('chatroom', roomSchema)
module.exports = ChatRoom