const express = require("express")
const session = require('express-session')
const path = require('path')
const {WebSocketServer} = require("ws")
const http = require("http")
const { v4: uuidv4 } = require('uuid');
const routes = require('./controllers')
const {joinRoom, leaveRoom} = require('./ws-functions')

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
app.use(express.static(path.join(__dirname, '../client/build')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})


app.use(routes)

//Save ws with key userId
const map = {}

//Create websocket server
const server = new http.createServer(app)
const wss = new WebSocketServer({ clientTracking: false, noServer: true })

//Server middleware, checking login status should be added here later
server.on('upgrade', (request, socket, head) => { 
    //console.log('Bypassing check of session data')
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    })
})

//WSS listeners
wss.on("connection", (ws,req) => {
    console.log('Client has connected to ws server.')
    ws.id = uuidv4()

    ws.on('message', data =>{
        data = JSON.parse(data)
        if(data.joinRoom){
            console.log(`client wants to join the room: ${data.roomName}`)
            joinRoom(data.roomName, ws.id)
            ws.room = data.roomName
            return
        }
        /*
        wss.clients.forEach(client => {
            client.send(`${data.message}`)
        })
        */
    })

    ws.on('close', () => {
        leaveRoom(ws.room, ws.id)
    })
})

db.once('open', () => {
    server.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    })
})