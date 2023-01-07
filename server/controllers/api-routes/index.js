const router = require('express').Router()
const {User} = require('../../models')

router.post('/sign-up', async(req, res) => {
    try {
        const {username, email, password} = req.body
        const userData = User.create({username, email, password})
        
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
        const userData = User.findOne({email: req.body.email})
        if(!userData){
            res.status(400).json({message: `No user with that email and password was found.`})
            return
        }
        const validPassword = await userData.isCorrectPassword(req.body.password)
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