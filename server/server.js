const express = require("express")
const db = require("./config/connection")
const path = require('path')
const ws = require("ws")
const http = require("http")

const PORT = process.env.PORT || 3001
const app = express()

//Middleware to parse incoming data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Render React html
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}
  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

//Create websocket server
const server = new http.createServer(app)
const wss = new WebSocket.Server({server})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    })
})