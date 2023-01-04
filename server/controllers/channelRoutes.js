const router = require('express').Router()
const {Channel} = require('../models')

router.get('/:roomName', async(req,res) => {
    const channelData = await Channel.findOne({name: req.params.roomName})
    if(!channelData){
        res.status(400).json({message: `Could not find channel with name: ${req.params.roomName}`})
    }
    res.status(200).json(channelData)
})

module.exports = router