const {Schema, model, default: mongoose} = require('mongoose')
const moment = require('moment')

const messageSchema = new Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        body: {
            type: String,
            required: true
        },
        chatRoom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'chatroom'
        },
        createdData: {
            type: Date,
            default: Date.now,
            get: date => moment(date).format('DD/MM/YYYY LT')
        }
    }
)

const Message = model('message', messageSchema)

module.exports = Message