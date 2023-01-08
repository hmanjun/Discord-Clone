const router = require('express').Router()

const userRoutes = require('./user-routes/user')
const channelRoutes = require('./channel-routes/channel')

router.use('/user', userRoutes)
router.use('/channel', channelRoutes)

module.exports = router