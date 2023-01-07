const router = require('express').Router()

const channelRoutes = require('./channelRoutes')
const apiRoutes = require('./api-routes')

router.use('/api', apiRoutes)
router.use('/channels', channelRoutes)

module.exports = router