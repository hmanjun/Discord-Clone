const router = require('express').Router()

const userRoutes = require('./user-routes/user')
const channelRoutes = require('./channel-routes/channel')
const chatRoute = require('./chat-routes/chat')
const messageRoute = require('./message-routes/message')

router.get('/', async(req,res) => {
    try {
        res.status(200).json({message: "Welcome to dclone api!"})
    } catch (err) {
        res.status(400).json(err)
    }
})
router.use('/user', userRoutes)
router.use('/channel', channelRoutes)
router.use('/chat-room', chatRoute)
router.use('/message', messageRoute)


module.exports = router