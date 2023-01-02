const express = require("express")
const session = require('express-session')
const uuid = require('uuid')
const path = require('path')
const ws = require("ws")
const http = require("http")

const db = require("./config/connection")
const PORT = 8080

//const PORT = process.env.PORT || 3001
const app = express()
const sess = {
    secret: 'fnwafnj dwabi',
    saveUninitialized: false,
    resave:false
}
app.use(session(sess))

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

//Save ws with key userId
const map = {}

//Create websocket server
const server = new http.createServer(app)
const wss = new WebSocket.Server({ clientTracking: false, noServer: true })

//Server middleware, checking login status should be added here later
server.on('upgrade', (req, socket, head) => { 
    console.log('Bypassing check of session data')
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    })
})

//WSS listeners
wss.on("connection", (ws,req) => {
    ws.on('message', message =>{
        console.log(`Recieved message: ${message}`)
    })

    ws.on('close', () => {
        //map.delete(userId)
    })
})

db.once('open', () => {
    server.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    })
})