const router = require('express').Router()

const userRoutes = require('./user-routes/user')
const channelRoutes = require('./channel-routes/channel')
const chatRoute = require('./chat-routes/chat')
const messageRoute = require('./message-routes/message')

router.use('/user', userRoutes)
router.use('/channel', channelRoutes)
router.use('/chat-room', chatRoute)
router.use('/message', messageRoute)


module.exports = router