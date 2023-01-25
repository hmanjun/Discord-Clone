const router = require('express').Router()
const {User, ChatRoom} = require('../../../models')
const withAuth = require('../../../utils/auth')

router.post('/sign-up', async(req, res) => {
    try {
        const {username, email, password} = req.body
        const userData = await User.create({username, email, password})
        
        req.session.save(() => {
            req.session.userId = userData._id
            req.session.logged_in = true
            res.status(200).json({message: `New user was successfully created.`})
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/login', async(req,res) => {
    try {
        const {email, password} = req.body
        const userData = await User.findOne({email: email})
        if(!userData){
            res.status(400).json({message: `No user with that email and password was found.`})
            return
        }
        const validPassword = await userData.isCorrectPassword(password)
        if(!validPassword) {
            res.status(400).json({message: `No user with that email and password was found.`})
            return
        }
        req.session.save(() => {
            req.session.userId = userData._id
            req.session.logged_in = true
            res.status(200).json({message: `User id was saved to session.`})
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/logout', async(req,res) => {
    try {
        if(req.session.logged_in){
            req.session.destroy(() => {
                res.status(204).end()
            })
        } else res.status(400).end()
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/channels', withAuth, async(req,res) => {
    try {
        const userData = await User.findOne({_id: req.session.userId}).populate('joinedChannels')
        if(!userData){
            res.status(400).json({message: `No user found`})
            return
        }
        const {joinedChannels} = userData
        res.status(200).json({message: `heres the data`, data: joinedChannels})

    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/leave-all-chats', withAuth, async (req,res) => {
    try {
        const {joinedChannels} = await User.findById(req.session.userId).populate('joinedChannels')
        if(!joinedChannels) {
            res.status(400).json({message: `No user found`})
            return
        }
        joinedChannels.forEach(channel => {
            channel.chatRooms.forEach(async (roomId) => {
                await ChatRoom.findByIdAndUpdate(roomId, {$pull: {activeUsers: req.session.userId}})
            })
        })
        res.status(200).json({message: 'User removed from all chat rooms'})
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router