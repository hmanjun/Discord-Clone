const router = require('express').Router()
const apiRoutes = require('./api-routes/api')

router.use('/api', apiRoutes)

module.exports = router