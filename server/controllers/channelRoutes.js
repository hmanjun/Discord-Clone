const router = require('express').Router()

router.get('/:channelId', async(req,res) => {
    res.status(200).json({message: 'it works'})
})

module.exports = router