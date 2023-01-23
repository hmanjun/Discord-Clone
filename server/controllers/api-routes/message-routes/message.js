const router = require('express').Router()
const {Message} = require('../../../models')

router.get('/:msgId', async (req,res) => {
    try {
        const msgData = await Message.findById(req.params.msgId)
        if(!msgData){
            res.status(400).json({message: `No message found with that id`})
            return
        }
        res.status(200).json(msgData)
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router