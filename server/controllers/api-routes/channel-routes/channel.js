const router = require('express').Router()
const {Channel, ChatRoom} = require('../../../models')

/*
router.get('/:roomName', async(req,res) => {
    const channelData = await Channel.findOne({name: req.params.roomName})
    if(!channelData){
        res.status(400).json({message: `Could not find channel with name: ${req.params.roomName}`})
    }
    res.status(200).json(channelData)
})
*/

router.post('/create', async(req,res) => {
    try {
        const {name} = req.body
        const {_id} = await ChatRoom.create({name: 'general'})
        const channelData = await Channel.create({name: name, users: [req.session.userId], chatRooms: [_id]})
        res.status(200).json(channelData)
    } catch (err) {
        res.status(400).json(err)
    }

})

router.patch('/join/:channelId', async(req,res) => {
    try {
        await Channel.findByIdAndUpdate(req.params.channelId, {$push: {users: req.session.userId}})
        res.status(200).json({message: `Successfully joined channel`})
    } catch (err) {
        res.status(400).json(err)
    }
})
module.exports = router