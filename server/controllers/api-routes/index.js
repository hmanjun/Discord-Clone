const router = require('express').Router()

const userRoutes = require('./user-routes')
const channelRoutes = require('./channel-routes')

router.use('/user', userRoutes)
router.use('/channel', channelRoutes)

module.exports = router