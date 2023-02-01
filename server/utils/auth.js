const jwt = require('jsonwebtoken')
require('dotenv').config()

const withAuth = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

const withRoom = (req,res,next) => {
    const roomHeader = req.headers['room']
    const token = roomHeader && roomHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, room) => {
        if(err) return res.sendStatus(403)
        req.room = room
        next()
    })
}

module.exports = {withAuth, withRoom}