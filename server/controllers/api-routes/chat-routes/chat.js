const router = require('express').Router()
const {ChatRoom, Message} = require('../../../models')
const {withAuth, withRoom} = require('../../../utils/auth')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/join/:chatId', withAuth ,async(req,res) => {
    try {
        const {_id} = await ChatRoom.findByIdAndUpdate(req.params.chatId, {$push: {activeUsers: req.user.userId}})
        //req.session.currentChat = req.params.chatId
        const user = {userId: req.user.userId, logged_in: true, currentChat: req.params.chatId}
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({accessToken: accessToken})
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/leave', withAuth, async(req,res) => {
    try {
        await ChatRoom.findByIdAndUpdate(req.user.currentChat, {$pull: {activeUsers: req.user.userId}})
        res.status(200).json({message: `Successfully left chat`})
    } catch (err) {
        res.status(400).json(err)
    }
})


router.get('/room-data', withAuth, async(req,res) => {
    try {
        const chatRoomData = await ChatRoom.findById(req.user.currentChat)
            .populate({path: 'messages', populate: {path: 'author', select: 'username'}})
            .populate({path: 'activeUsers', select: 'username'})
        res.status(200).json(chatRoomData)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/send-message', withAuth, async(req,res) => {
    try {
        const {body} = req.body
        const {_id} = await Message.create({author: req.user.userId, body: body, chatRoom: req.user.currentChat})
        await ChatRoom.findByIdAndUpdate(req.user.currentChat, {$push: {messages: _id}})
        res.status(200).json({messageId: _id})
    } catch (err) {
        res.status(400).json(err)
    }
})
module.exports = router