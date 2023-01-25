const db = require('../config/connection')
const {Channel, Message, User, ChatRoom} = require('../models')

db.once('open', async () => {
    try {
        await Channel.deleteMany({})
        await Message.deleteMany({})
        await User.deleteMany({})
        await ChatRoom.deleteMany({})
        /*
        await Channel.create([
            {
                name: 'Public Channel A'
            }
        ])
        */
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

    console.log('database seeded')
    process.exit(0)
})