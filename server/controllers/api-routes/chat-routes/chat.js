const router = require('express').Router()
const {ChatRoom, Message} = require('../../../models')

router.patch('/join/:chatId', async(req,res) => {
    try {
        const {_id} = await ChatRoom.findByIdAndUpdate(req.params.chatId, {$push: {activeUsers: req.session.userId}})
        req.session.currentChat = _id
        res.status(200).json({message: `Successfully joined chat`})
    } catch (err) {
        res.status(400).json(err)
    }
})

router.patch('/leave', async(req,res) => {
    try {
        if(!req.session.currentChat) {
            res.status(406).end()
            return
        }
        await ChatRoom.findByIdAndUpdate(req.session.currentChat, {$pull: {activeUsers: req.session.userId}})
        req.session.currentChat = null
        res.status(200).json({message: `Successfully left chat`})
    } catch (err) {
        res.status(400).json(err)
    }
})


router.get('/get-messages', async(req,res) => {
    try {
        if(!req.session.currentChat) {
            res.status(406).end()
            return
        }
        const {messages} = await ChatRoom.findById(req.session.currentChat).populate('messages')
        res.status(200).json(messages)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/send-message', async(req,res) => {
    try {
        const {body} = req.body
        const {_id} = await Message.create({author: req.session.userId, body: body, chatRoom: req.session.currentChat})
        await ChatRoom.findByIdAndUpdate(req.session.currentChat, {$push: {messages: _id}})
        res.status(200).json({message: `Successfully posted message to chart room`})
    } catch (err) {
        res.status(400).json(err)
    }
})
module.exports = router