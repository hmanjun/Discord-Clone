const router = require('express').Router()
const {User} = require('../../models')

router.post('/login', async(req,res) => {
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
    req.session.userId = userData._id
    res.status(200).json({message: `User id was saved to session.`})
})